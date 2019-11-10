// initial state
const state = {
  otherSpecial: [], // 涉及其他特殊作业

  scMan: null,
  zyMan: null,

  pipeBlockOperator0: [], // 堵作业人0
  pipePullOperator0: [], // 抽作业人0
  pipeBlockGuardian0: [], // 堵监护人0
  pipePullGuardian0: [], // 抽监护人0

  pipeBlockOperator1: [], // 堵作业人1
  pipePullOperator1: [], // 抽作业人1
  pipeBlockGuardian1: [], // 堵监护人1
  pipePullGuardian1: [], // 抽监护人1

  pipeBlockOperator2: [], // 堵作业人2
  pipePullOperator2: [], // 抽作业人2
  pipeBlockGuardian2: [], // 堵监护人2
  pipePullGuardian2: [], // 抽监护人2

  pipeBlockOperator3: [], // 堵作业人3
  pipePullOperator3: [], // 抽作业人3
  pipeBlockGuardian3: [], // 堵监护人3
  pipePullGuardian3: [], // 抽监护人3

  pipeBlockOperator4: [], // 堵作业人4
  pipePullOperator4: [], // 抽作业人4
  pipeBlockGuardian4: [], // 堵监护人4
  pipePullGuardian4: [], // 抽监护人4
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
