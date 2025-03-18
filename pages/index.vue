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

<script setup>
import { ref } from 'vue'
import { useDaylightStore } from '~/stores/daylight'

const daylightStore = useDaylightStore()
const latitude = ref('')
const longitude = ref('')
const daylightHours = ref(null)

async function getDaylight() {
  daylightHours.value = await daylightStore.fetchDaylightHours(latitude.value, longitude.value)
}
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
</style>
