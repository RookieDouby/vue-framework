const state = {
	username: 'sam'
}

const mutations = {
	SET_USERNAME: (state, name) => {
		state.username = name;
	}
}

const actions = {
	setUsername({ commit }, name) {
		commit('SET_USERNAME', name)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
