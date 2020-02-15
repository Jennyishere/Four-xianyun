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
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input></el-input>
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
        
        // 移除乘机人
        handleDeleteUser(index){
            this.form.users.splice(index, 1);
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            
        },

        // 提交订单
        handleSubmit(){
            console.log(this.form.users)
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