// initial state
const state = {
  keepAliveComponents: ["diaozhuangList","diaozhuang_index"],
  whsb: [],
  zyfzr: [],
  jhr: [],
  zydw: [],
  work_permit_1: {},
  work_permit_2: {},
  work_permit_3: {},
  sqbm:[],
  dhzyRen:[]
};

// getters
const getters = {};

// actions
const actions = {
  changTag({ commit }, tags) {
	  console.log("commit",tags)
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
    localStorage.setItem("isfresh",'false');
    console.log(123)
    state[tags.key] = tags.value;
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
