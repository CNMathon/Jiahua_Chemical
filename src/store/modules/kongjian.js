// initial state
const state = {
  zyOtherspecial: [],
  otherSpecial: [],
  zywhBs: [],
  guardian: [], //监护人
  zyPrincipal: [], //作业部门负责人
  zyRen: [], //作业人
  sxkjDanwei: [] //受限空间所属单位
};

// getters
const getters = {};

// actions
const actions = {
  changTag({ commit }, tags) {
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
    state[tags.key] = tags.value;
  },
  resetState(state) {
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        state[key] = [];
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
