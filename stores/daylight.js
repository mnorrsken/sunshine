import { defineStore } from 'pinia'
import axios from 'axios'

export const useDaylightStore = defineStore('daylight', {
  state: () => ({
    daylightHours: null
  }),
  actions: {
    async fetchDaylightHours(latitude, longitude) {
      try {
        const response = await axios.post('/api/daylight', {
          latitude,
          longitude
        })
        this.daylightHours = response.data.daylight_hours
        return response.data.daylight_hours
      } catch (error) {
        console.error('Error fetching daylight hours:', error)
        return null
      }
    }
  },
  getters: {
    getDaylightHours: (state) => state.daylightHours
  }
})
