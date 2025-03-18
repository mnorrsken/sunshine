import axios from 'axios'

export default function ({ $axios }) {
  $axios.onRequest(config => {
    config.baseURL = 'http://localhost:5000'
  })
}
