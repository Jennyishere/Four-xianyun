import { Message } from "element-ui"

// 网页启动时候执行该文件， data参数是插件里面本来就有的
export default  (data) => {
    // console.log("执行axios插件");
    // console.log(data);

    // 拦截请求的错误
    data.$axios.onError(err => {
        const {statusCode, message} = err.response.data;

        // 判断状态如果是400， 展示错误信息
        if(statusCode === 400){
            // 使用elementui组件提示错误
            Message.error(message)
        }

        // 当前请求的token是有问题，401一般是因为token是错误或者过期，403是因为接口没有传token
        if(statusCode === 401 || statusCode === 403){
            // 跳转到登录页
            // data.redirect(200, "/user/login", {
            //     returnUrl: data.route.fullPath
            // })
        }
    })
}