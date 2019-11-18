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
    console.log(33333333)
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
    console.log('clean')
    commit("resetState");
  }
};

// mutations
const mutations = {
  setTag(state, { tags }) {
    console.log(tags.value)
    // tags.value.forEach((item)=>{
    //   console.log(item)
    //   state[tags.key].push(item)
    // })
    state[tags.key] =tags.value;
    // state[tags.key] =JSON.parse(state[tags.key]);
    // console.log(JSON.stringify(tags.value))
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
