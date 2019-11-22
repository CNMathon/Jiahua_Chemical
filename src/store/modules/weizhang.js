// initial state
const state = {
	selectProject: "",
	jcry: [],// 检察人员
	wzry: [],// 违章人员
	wzlx: [],//违章类型
	wzkhbz: [], // 违章考核标准
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
	setTag(state, {
		tags
	}) {
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
