export const state = () => {
    return {
        // 历史查询数组
        history: []
    }
}

export const mutations = {
    // 把传入的表单数据存储在history
    setHistory(state, data){
        state.history.push(data);
    }
}