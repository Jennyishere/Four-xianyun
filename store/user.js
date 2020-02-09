// 固定的属性，必须要export暴露出去的
export const state = () => {
    return {
        // name: "我的名字"
    
        // 用户信息,来自于登录之后返回的数据
        userInfo: {
            user: {}
        }
    }
}


// 固定的属性，同步修改state中的值
export const mutations = {
    // 函数名自定义,
    // 第一个参数必须是state, 第二个参数调用时候传入的参数
    setUserInfo(state, data){
        state.userInfo = data;
    }
}

// 固定的属性，异步修改state中的值的方法，一般存放接口的请求的
export const actions = {
    // 函数名自定义,
    // 第一个参数必须是store, 第二个参数调用时候传入的参数
    // 登录的方法
    login(store, data){ 

        // 提交到登录接口
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            // data是要保存到userInfo
            const {data} = res;
            // 调用commit保存数据到state
            store.commit('setUserInfo', data);
        })
    },

    // 注册方法
    register(store, data){
        // 调用注册的接口
        return this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
        }).then(res => {
            // data是要保存到userInfo
            const {data} = res;
            // 调用commit保存数据到state
            store.commit('setUserInfo', data);
        })
    },

    // 发送手机验证码, data是手机号码字符串
    sendCaptcha(store, data){
        return this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel: data // 用户名就是手机号码
            }
        }).then(res => {
            // console.log("store中的：", res);
            return res;
        })
        
        // .then(res1 => {
        //     console.log(res1); // 123
        //     return 456;
        // }).then(res2 => {
        //     console.log(res2) // 456
        //     return 789;
        // })
    }
}