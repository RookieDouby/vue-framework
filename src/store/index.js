import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const state = {
	mainVariability: 'test1',
	students: [
		{name: 'Nick', age: 23, salary: 20000, id: '0001'},
		{name: 'Jim', age: 24, salary: 13000, id: '0002'},
		{name: 'Jenny', age: 24, salary: 13000, id: '0003'},
		{name: 'Jerry', age: 35, salary: 30000, id: '0004'},
	]
}

const store = new Vuex.Store({
  state,
  modules: {
    user,
  },
  getters,
})

export default store
