export const state = () => {
  return {
    search: "",
    SendSearch:"",
  };
};
export const mutations = {
  setSearch(state, data) {
    state.search = data;
  },
  setSendSearch(state, data){
    state.SendSearch = data;
  }
};
export const actions = {
  searchCity(seate, data) {
    return this.$axios({
      url: "/posts",
       params: 
        data
       
    })
  }
};
