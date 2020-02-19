export const state = () => ({
    draft: []
})
export const mutations = {
    setDraft(state, data) {
        state.draft.unshift(data);
        if (state.draft.length > 5) {
            state.draft.splice(5,1);
        }
    }
}