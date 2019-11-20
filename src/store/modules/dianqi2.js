// initial state
const state = {
    keepAliveComponents: ["dianqi_2_list"],
  };
  
  // getters
  const getters = {};
  
  // actions
  const actions = {
    changTag({ commit }, tags) {
      console.log(3333333333333333)
      console.log(commit)
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
  