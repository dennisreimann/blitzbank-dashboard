import axios from 'axios'

const headers = {
  accept: 'application/json',
  'content-type': 'application/json'
}
const config = {
  headers,
  withCredentials: true,
  validateStatus (status) {
    return status < 500
  }
}

const post = (path, payload = {}) => axios.post(`/api/${path}`, payload, config)
const put = (path, payload = {}) => axios.put(`/api/${path}`, payload, config)
const del = (path, data = {}) => axios.delete(`/api/${path}`, Object.assign({}, config, { data }))
const get = path => axios.get(`/api/${path}`, config)

export default {
  get,
  post,
  put,
  del
}
