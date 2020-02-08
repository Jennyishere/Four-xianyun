<template>
    <!-- model：指定表单的数据对象 -->
    <!-- ref: 用于获取dom对象 -->
    <!-- rules: 表单验证规则 -->
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <!-- prop不要漏掉，或者不要加错了位置 -->
        <el-form-item class="form-item" prop="username">
            <el-input 
            v-model="form.username"
            placeholder="用户名/手机">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item"  prop="password">
            <el-input 
            v-model="form.password"
            placeholder="密码" 
            type="password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        return {
            // 表单数据
            form: {
                username: "",
                password: ""
            },
            // 表单规则
            rules: {
                username: [
                    // required表示必填，message错误的提示信息. trigger输入框失去焦点时候触发验证
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
            // el-form都有一个validate的方法用于验证的
            this.$refs.form.validate(vaild => {
                // 验证通过
                if(vaild){
                    // 提交到登录接口
                    console.log(this.form)
                }
            }) 
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
