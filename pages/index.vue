<template>
  <div class="sunshine-container">
    <div class="sun-icon">
      <div class="sun"></div>
      <div class="rays"></div>
    </div>
    
    <h1 class="title">Sunshine Calculator</h1>
    
    <div class="card">
      <form @submit.prevent="getDaylight">
        <div class="form-group">
          <label for="latitude">Latitude:</label>
          <input type="text" v-model="latitude" id="latitude" required>
        </div>
        
        <div class="form-group">
          <label for="longitude">Longitude:</label>
          <input type="text" v-model="longitude" id="longitude" required>
        </div>
        
        <div class="button-group">
          <button type="button" @click="getCurrentLocation" :disabled="isLoading" class="location-btn">
            <span class="location-icon">📍</span>
            {{ isLoading ? 'Getting Location...' : 'Use My Location' }}
          </button>
          <button type="submit" class="calculate-btn">
            <span class="calc-icon">☀️</span> Calculate Daylight
          </button>
        </div>
        
        <div v-if="locationError" class="error-message">
          {{ locationError }}
        </div>
      </form>
    </div>
    
    <div v-if="daylightHours !== null" class="result-card">
      <div class="result-sun"></div>
      <h2 class="result-title">Daylight Hours</h2>
      <div class="hours-value">{{ daylightHours }}</div>
      <div v-if="location" class="location-display">
        <div class="location-icon-small">📍</div>
        <div class="location-name">{{ location }}</div>
      </div>
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
const location = ref(null)
const isLoading = ref(false)
const locationError = ref(null)

function getCurrentLocation() {
  locationError.value = null
  
  // Check if geolocation is supported by the browser
  if (!('geolocation' in navigator)) {
    locationError.value = 'Geolocation is not supported by your browser'
    return
  }
  
  isLoading.value = true
  
  navigator.geolocation.getCurrentPosition(
    // Success callback
    (position) => {
      latitude.value = position.coords.latitude.toFixed(6)
      longitude.value = position.coords.longitude.toFixed(6)
      isLoading.value = false
    },
    // Error callback
    (error) => {
      isLoading.value = false
      switch(error.code) {
        case error.PERMISSION_DENIED:
          locationError.value = 'Permission to access location was denied'
          break
        case error.POSITION_UNAVAILABLE:
          locationError.value = 'Location information is unavailable'
          break
        case error.TIMEOUT:
          locationError.value = 'Request to get location timed out'
          break
        default:
          locationError.value = 'An unknown error occurred'
          break
      }
    },
    // Options
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  )
}

async function getDaylight() {
  const result = await daylightStore.fetchDaylightHours(latitude.value, longitude.value)
  daylightHours.value = result.daylightHours
  location.value = result.location
}
</script>

<style scoped>
.sunshine-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #f6fbff 0%, #fff8e8 100%);
}

.title {
  color: #ff8a00;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
}

.sun-icon {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
}

.sun {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ffdd00 30%, #ff8c00 100%);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255, 204, 0, 0.8);
  animation: pulse 3s infinite ease-in-out;
}

.rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 
    0 0 0 20px rgba(255, 204, 0, 0.1),
    0 0 0 40px rgba(255, 204, 0, 0.05);
  animation: rays 5s infinite linear;
}

.card {
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #ff8a00;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 138, 0, 0.2);
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:active {
  transform: scale(0.98);
}

.location-btn {
  background-color: #3498db;
  color: white;
  flex: 1;
}

.location-btn:hover {
  background-color: #2980b9;
}

.calculate-btn {
  background-color: #ff8a00;
  color: white;
  flex: 1;
}

.calculate-btn:hover {
  background-color: #ff7600;
}

.location-icon, .calc-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
}

.result-card {
  background: linear-gradient(135deg, #ffd34e 0%, #ff8c00 100%);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 12px 32px rgba(255, 140, 0, 0.3);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;
}

.result-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.hours-value {
  font-size: 3rem;
  font-weight: bold;
  position: relative;
  z-index: 2;
}

.result-sun {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 70%);
  border-radius: 50%;
  z-index: 1;
}

.location-display {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1.2rem;
}

.location-icon-small {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.location-name {
  font-weight: 500;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

@keyframes rays {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
