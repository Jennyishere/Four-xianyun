export const state = () => {
  return {
    hotelDetail: {
      hotelbrand: {},
      location: {},
      scores: {}
    }
  };
};

export const mutations = {
  setHotelInfo(state, data) {
    state.hotelDetail = data;
  }
};
