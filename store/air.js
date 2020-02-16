export const state = () => {
    return {
        // 历史查询数组
        history: [],
        // 订单的详细信息
        orderDetail: {
            // 为了避免模板报错
            seat_infos: {}
        },
        // 总价格
        allPrice: 0
    }
}

export const mutations = {
    // 把传入的表单数据存储在history
    setHistory(state, data){
        // 把新的搜索记录添加到第一位
        state.history.unshift(data);
        // 截取数组的长度为5
        state.history.length = 5;
    },

    // 修改orderDetail的数据
    setOrderDetail(state, data){
        state.orderDetail = data;
    },

    // 保存总价格
    setAllPrice(state, data){
        state.allPrice = data;
    }
}