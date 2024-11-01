import axios from 'axios'

const defaultOptions = {
  baseURL: 'https://api-airdropband.w3w.app',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}
const BaseAPI = axios.create(defaultOptions)

BaseAPI.interceptors.request.use(
  async config => {
    // const tokenUser = Cookies.get('tokenUser')

    // if (config?.headers?.Authorization === undefined && tokenUser) {
    //   config.headers.Authorization = tokenUser?.length > 0 ? `Bearer ${tokenUser}` : ''
    // }

    return config
  },
  error => {
    Promise.reject(error)
  })

export { BaseAPI }
