<template>
    <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info">
                <!-- 乘机人一组信息，循环users -->
                <div class="member-info-item" 
                v-for="(item, index) in form.users"
                :key="index">

                    <el-form-item label="乘机人类型">
                        <!-- 需要进行双向数据绑定 -->
                        <el-input 
                        placeholder="姓名" 
                        class="input-with-select" 
                        v-model="item.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  
                        class="input-with-select"
                        v-model="item.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <!-- 循环渲染保险数据 -->
                <div class="insurance-item" 
                v-for="(item, index) in infoData.insurances"
                :key="index">
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" 
                    border
                    @change="handleInsurance(item.id)">
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input 
                        placeholder="请输入内容" 
                        v-model="form.contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="form.captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                // 乘机人的列表
                users:[
                    {
                        username: "",
                        id: ""
                    }
                ],
                insurances: [],
                contactName: "",
                contactPhone: "",
                captcha: "", // 文档中缺少该属性（文档中写错了）
                invoice: false,
                seat_xid: this.$route.query.seat_xid,
                air: this.$route.query.id,
            },

            // 当前机票的详细信息
            infoData: {}
        }
    },
    mounted(){
        // 请求机票详细信息（保险还有右侧栏需要的数据）
        const {id, seat_xid} = this.$route.query;
        this.$axios({
            url: "/airs/" + id,
            params: {
                seat_xid
            }
        }).then(res => {
            // 赋值给机票的详细信息
            this.infoData = res.data;
        })
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.form.users.push({
                username: "",
                id: ""
            })
        },

        // 处理保险数据的
        handleInsurance(id){
            // 先判断数组中是否存在该id
            const index = this.form.insurances.indexOf(id);

            // 如果已经有了这个id，说明当前是取消的状态
            if(index > -1){
                // 删除该id
                this.form.insurances.splice(index, 1);
            }else{
                // 没有id就是新增
                this.form.insurances.push(id);
            }
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.form.users.splice(index, 1);
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            if(!this.form.contactPhone){
                this.$message.error("手机号码不能为空")
                return;
            }
            // 调用store/user.js中发送验证码方法
            this.$store.dispatch(
                "user/sendCaptcha", 
                this.form.contactPhone
            ).then(res => {
                this.$message.success("验证码发送成功：000000")
            } )
        },

        // 提交订单
        handleSubmit(){
            // 自定义表单的验证
            const rules = {
                // 校验用户列表
                users: {
                    errMessage: "乘机人信息不能为空",
                    // 校验的函数,该函数返回是true的证明验证通过，如果是false就验证失败
                    validator: () => {
                        let valid = true;
                        this.form.users.forEach(v => {
                            // 只要有一个属性的值是空的话表单没通过
                            if(!v.username || !v.id){
                                valid = false;
                            }
                        });

                        return valid;
                    }
                },

                // 校验联系人
                contactName: {
                    errMessage: "联系人不能为空",
                    validator: () => {
                        return !!this.form.contactName;
                    }
                },

                // 校验手机号码
                contactPhone: {
                    errMessage: "手机号码不能为空",
                    validator: () => {
                        return !!this.form.contactPhone;
                    }
                },

                // 校验验证码
                captcha: {
                    errMessage: "验证码不能为空",
                    validator: () => {
                        return !!this.form.captcha;
                    }
                }
            }

            // 循环rules对象调用validator方法实现校验
            // console.log(Object.keys(rules))

            // 先假设所有校验都是通过的
            let  valid = true;
            Object.keys(rules).forEach(v => {
                // 如果已经有字段校验不通过，就不用继续判断了
                if(!valid) return;

                const item = rules[v];
                // 执行每个字段下的validator函数
                valid = item.validator();
                
                if(!valid){
                    this.$message.error(item.errMessage);
                }
            })

            // 如果验证没通过，就直接返回
            if(!valid) return;

            // 调用提交订单的接口
            // console.log(this.form.insurances)
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>