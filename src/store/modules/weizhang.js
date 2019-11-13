// initial state
const state = {
	selectProject: ""
};

// getters
const getters = {};

// actions
const actions = {

};

// mutations
const mutations = {
	setTag(state, {
		tags
	}) {
		state[tags.key] = tags.value;
	}

};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
