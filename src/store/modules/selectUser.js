// initial state
const state = {
  userList: []
};

// getters
const getters = {};

// actions
const actions = {
  setData({ commit }, value) {
    commit("setTag", { value });
  },
  cleanState({ commit }) {
    commit("resetState");
  }
};

// mutations
const mutations = {
  setTag(state, { value }) {
    state.userList = value;
  },
  resetState(state) {
    state.userList = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
