import axios from 'axios'
import qs from 'qs'
const port = 8081
const server_url = process.env.NODE_ENV === 'development' ? location.protocol + '//' + location.hostname + ':' + port
  : 'https://radiant-fortress-28922.herokuapp.com/'

const axios_tuned = axios.create({
  baseURL: server_url,
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
