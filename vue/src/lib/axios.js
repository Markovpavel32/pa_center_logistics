import axios from 'axios'
import qs from 'qs'
import { normalize, schema } from 'normalizr'

const port = 8081
const server_url = process.env.NODE_ENV === 'development' ? location.protocol + '//' + location.hostname + ':' + port
  : 'https://radiant-fortress-28922.herokuapp.com/'

const axios_tuned = axios.create({
  baseURL: server_url,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})

const config = {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  mode: 'cors',
  credentials: 'include'
}

export const fetch_post = (url, data) => {
  config.body = data
  return fetch(server_url + url, config)
}

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

export class AjaxOperator {
  constructor (url, store, model_name, idAttribute) {
    this.url = url
    this.store = store
    this.model_name = model_name
    this._idAttribute = idAttribute || 'id'
  }

  get (config) {
    return axios_get(this.url, config).then(res => {
      const entity = new schema.Entity(this.model_name, {}, { idAttribute: this._idAttribute })
      const normalized_data = normalize(res.data, [entity])
      if (!this.store.state.models.application_appointment) {
        this.store.registerModule(['models', this.model_name], { state: normalized_data.entities[this.model_name] })
      }
      return res.data
    })
  }

  post (data, config) {
    return axios_get(this.url, data, config)
  }

  model (model_name) {
    this.model = model_name
  }
  // переопределения ключа id для normalizr (можно выбрать любое проперти объекта в качестве ключа для нормалайза)
  idAttribute (id_key) {
    this._idAttribute = id_key
  }
}
