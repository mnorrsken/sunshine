<template>
  <div>
    <h1>Sunshine Calculator</h1>
    <form @submit.prevent="getDaylight">
      <div>
        <label for="latitude">Latitude:</label>
        <input type="text" v-model="latitude" id="latitude" required>
      </div>
      <div>
        <label for="longitude">Longitude:</label>
        <input type="text" v-model="longitude" id="longitude" required>
      </div>
      <button type="submit">Calculate Daylight</button>
    </form>
    <div v-if="daylightHours !== null">
      <h2>Daylight Hours: {{ daylightHours }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: '',
      longitude: '',
      daylightHours: null
    }
  },
  methods: {
    async getDaylight() {
      try {
        const response = await this.$axios.post('/api/daylight', {
          latitude: this.latitude,
          longitude: this.longitude
        })
        this.daylightHours = response.data.daylight_hours
      } catch (error) {
        console.error('Error fetching daylight hours:', error)
      }
    }
  }
}
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
</style>
