export const state = () => {
    return {
        // 历史查询数组
        history: []
    }
}

export const mutations = {
    // 把传入的表单数据存储在history
    setHistory(state, data){
        // 把新的搜索记录添加到第一位
        state.history.unshift(data);
        // 截取数组的长度为5
        state.history.length = 5;
    }
}