// initial state
const state = {
  keepAliveComponents: ['gongdanguanli_list','gongdanguanli'],
	whsb:[] ,// 危害辨识

  device: [], // 空间设备
  projectInfo: [], // 检修项目,
  guardianshipInfo: [], // 监护人
  executorInfo: [], // 作业人员
  securityInfo: [], // 安全教育人
  sceneInfo: [], // 现场负责人
  harmType: [], // 危害辨识
};

// getters
const getters = {

};

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
