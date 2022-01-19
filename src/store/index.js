import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    peopleList: []
  },
  mutations: {
    setPeopleList(state, arr) {
      state.peopleList = []
      state.peopleList = arr
    }
  },
  actions: {
    // async set_People_list({commit}) {
    //
    // }
  },
})
