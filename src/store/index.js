import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

/* Конструкторы */
function Progress(obj, percent, width) {
  this.Color = obj.Color;
  this.Amount = obj.Amount;
  this.Percent = percent;
  this.Width = width;
}
function Rectangles(obj, width, absolute, less) {
  this.id = obj.id;
  this.Amount = obj.Amount;
  this.Color = obj.Color;
  this.Width = width;
  this.Absolute = absolute;
  this.Less = less;
}

export default new Vuex.Store({
  state: {
    peopleList: [],
    numPage: 1,
    showDialog: false,
    dataForDialog: {},
    updatedAttention: [],
    updatedLastBlock: [],
    rectangles: [
      {
        id: 1,
        Amount: 15,
        Color: "E45959",
      },
      {
        id: 2,
        Amount: 12,
        Color: "E4AC59",
      },
      {
        id: 3,
        Amount: 35,
        Color: "5999E4",
      },
      {
        id: 4,
        Amount: 38,
        Color: "56D953",
      },
    ],
  },
  mutations: {
    setPeopleList(state, arr) {
      state.peopleList = []
      state.peopleList = arr
    },
    manipulationData({commit, state}) {
      state.peopleList.map(elem => {
        commit('calcProgress', elem)
        elem.Attention = state.updatedAttention
        commit('calcRectangles', elem)
      })
    },
    calcProgress(state, object) {
      state.updatedAttention = []
      if (object.Attention !== null) {
        let summary = object.Attention.reduce((a,b) => {
          return a + b.Amount
        }, 0)

        let defaultPercent = 100

        object.sort((a,b) => b.Amount - a.Amount)

        for (let i = 0; i < object.length; i++) {
          if (i === 0) {
            let percent = ((object[i].Amount)*100)/summary
            let width = defaultPercent
            defaultPercent-=percent
            state.updatedAttention.push(new Progress(object[i], percent, width))
          } else {
            let percent = ((object[i].Amount)*100)/summary
            let width = defaultPercent
            defaultPercent -= percent
            state.updatedAttention.push(new Progress(object[i], percent, width))
          }
        }
      }
    },
    calcRectangles(state, object) {
      /* NEED GENERATE AMOUNT RECTANGLE */
      let defaultPercent = 100
      object.Rectangles = state.rectangles.map(rectangle => {
        if (rectangle.id === state.rectangles.length) {
          rectangle.Amount = defaultPercent
        } else {
          rectangle.Amount = defaultPercent - Math.floor(Math.random() * (defaultPercent-10))
          defaultPercent -= rectangle.Amount
        }
      })

      const result = []
      // const newArray = []
      const values = []


      // object.Rectangles.map(elem => newArray.push(elem))

      object.Rectangles.map(elem => values.push(elem.Amount))

      const max = Math.max(...values)

      object.Rectangles.sort((a,b) => b.Amount - a.Amount).map(elem => {
        let width = (elem.Amount*100)/max
        let absolute = width >= 85
        let less = (elem.Amount < max) && !!absolute
        result.push(new Rectangles(elem, width, absolute, less))
      })
      object.Rectangles = result.sort((a,b) => a.id - b.id)
    },
  },
  actions: {
    async set_People_list({commit, state}) {
      axios.get(`https://api.in.dev-team.club/people?pp=${10}&p=${state.numPage}`)
          .then((response) => {
            commit('setPeopleList', response.data)
          })
    }
  },
})
