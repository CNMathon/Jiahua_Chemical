// initial state
const state = {
  keepAliveComponents: ["gaochuindex"],
  specialWork: [],
  harmAnalise: [],
  guarder: [],
  workDeptLeader: [],
  worker: []
};

// getters
const getters = {};

// actions
const actions = {
  changTag({ commit }, tags) {
    console.log(tags)
    commit("setTag", { tags });
  },
  deleteTagItem({ commit, state }, tags) {
    let arr = state[tags.key];
    let newArr = arr.filter(item => {
      return item !== tags.value;
    });
    tags.value = newArr;
    commit("setTag", { tags });
  },
  cleanState({ commit }) {
    commit("resetState");
  }
};

// mutations
const mutations = {
  setTag(state, { tags }) {
    console.log(tags.value)
    state[tags.key] = tags.value;
    console.log(tags.key)
    console.log(state)
  },
  resetState(state) {
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        state[key] = [];
      }
    }
  },
  add_KeepAlive(state, name) {
    if (state.keepAliveComponents.includes(name)) return;
    state.keepAliveComponents.push(name);
  },
  delete_KeepAlive(state, name) {
    const index = state.keepAliveComponents.indexOf(name);
    index > -1 && state.keepAliveComponents.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
