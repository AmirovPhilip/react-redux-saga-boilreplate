import axios from 'axios'

// let store = null// eslint-disable-line

// export const apiMiddleware = (reduxStore) => {
//   store = reduxStore
//   return (next) => (action) => {
//     next(action)
//   }
// }

const prefix = 'api/'
const baseURL = `/${prefix}`

const interceptMainConfig = (config) => {
  const { headers } = config
  headers['Content-Type'] = 'application/json;charset=UTF-8'
  headers['Cache-Control'] = 'no-cache'
  config.headers = { ...config.headers } // eslint-disable-line
  return config
}

const getAxiosConfig = () => ({ baseURL })

/* eslint-disable */
const instances = {
  _main: null,

  get main() {
    if (!this._main) {
      this._main = axios.create(getAxiosConfig())

      this._main.interceptors.request.use(
        interceptMainConfig,
        Promise.reject,
      )

      this._main.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error),
      )
    }
    return this._main
  },

  get(url, options) {
    return this.main.get(url, options)
      .then(this.formatResponse)
  },

  post(url, data, options) {
    return this.main.post(url, data, options)
      .then(this.formatResponse)
  },

  put(url, data, options) {
    return this.main.put(url, data, options)
      .then(this.formatResponse)
  },

  delete(url, options) {
    return this.main.delete(url, options)
      .then(this.formatResponse)
  },

  formatResponse(resp) {
    return resp && resp.data
  },
}
/* eslint-enable */

export const getUser = () => instances.get('user')
