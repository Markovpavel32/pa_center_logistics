import axios from 'axios'
import qs from 'qs'

const port = 8081

const axios_tuned = axios.create({
  baseURL: location.protocol + '//' + location.hostname + ':' + port,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

export const axios_post = (url, data, config) => {
  const new_data = {}
  for (let key in data) {
    new_data[key] = data[key]
  }
  data = qs.stringify({ ...(new_data || {}) })
  return axios_tuned.post(url, data, config)
}

export const axios_get = (url, config) => {
  return axios_tuned.get(url, config)
}
