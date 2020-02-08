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

// 固定的属性，修改state中的值
export const mutations = {
    // 函数名自定义,
    // 第一个参数必须是state, 第二个参数调用时候传入的参数
    setUserInfo(state, data){
        state.userInfo = data;
    }
}