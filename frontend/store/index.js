import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    daylightHours: null
  },
  mutations: {
    setDaylightHours(state, hours) {
      state.daylightHours = hours
    }
  },
  actions: {
    async fetchDaylightHours({ commit }, { latitude, longitude }) {
      try {
        const response = await axios.post('/api/daylight', {
          latitude,
          longitude
        })
        commit('setDaylightHours', response.data.daylight_hours)
      } catch (error) {
        console.error('Error fetching daylight hours:', error)
      }
    }
  },
  getters: {
    daylightHours: state => state.daylightHours
  }
})
