import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    peopleList: [],
    num_page: 1,
  },
  mutations: {
    setPeopleList(state, arr) {
      state.peopleList = []
      state.peopleList = arr
    }
  },
  actions: {
    async set_People_list({commit, state}) {
      axios.get(`https://api.in.dev-team.club/people?pp=${10}&p=${state.num_page}`)
          .then((response) => {
            commit('setPeopleList', response.data)
          })
    }
  },
})
