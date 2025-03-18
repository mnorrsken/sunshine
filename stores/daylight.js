import { defineStore } from 'pinia'
import axios from 'axios'

export const useDaylightStore = defineStore('daylight', {
  state: () => ({
    daylightHours: null,
    location: null
  }),
  actions: {
    async fetchDaylightHours(latitude, longitude) {
      try {
        const response = await axios.post('/api/daylight', {
          latitude,
          longitude
        })
        this.daylightHours = response.data.daylight_hours
        this.location = response.data.location
        
        return {
          daylightHours: response.data.daylight_hours,
          location: response.data.location
        }
      } catch (error) {
        console.error('Error fetching daylight hours:', error)
        return { daylightHours: null, location: null }
      }
    }
  },
  getters: {
    getDaylightHours: (state) => state.daylightHours,
    getLocation: (state) => state.location
  }
})
