export const state = () => {
  return {
    draft: [],
    search: "",
    SendSearch: ""
  };
};
export const mutations = {
  setSearch(state, data) {
    state.search = data;
  },
  setSendSearch(state, data) {
    state.SendSearch = data;
  },
  setDraft(state, data) {
    state.draft.unshift(data);
    if (state.draft.length > 5) {
      state.draft.splice(5, 1);
    }
  }
};
export const actions = {
  searchCity(seate, data) {
    return this.$axios({
      url: "/posts",
      params: data
    });
  }
};
