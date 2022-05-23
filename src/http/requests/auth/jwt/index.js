import axios from '../../../axios/index.js'
import store from '../../../../store/store.js'
import router from '@/router'

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const { config, response } = error
      const originalRequest = config

      // if (status === 401) {
      if (response && response.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          store.dispatch('auth/fetchAccessToken')
            .then((response) => {
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(response.data.access_token)
              sessionStorage.removeItem('accessToken')
              sessionStorage.removeItem('refreshToken')
              sessionStorage.setItem('accessToken', response.data.access_token)
              sessionStorage.setItem('refreshToken', response.data.refresh_token)
            })
        } else {
          sessionStorage.removeItem('accessToken')
          sessionStorage.removeItem('refreshToken')
          window.location.reload()
          // router.push({name: 'user-list'})
          // router.pushAsync = function (route) {
          //   return new Promise((resolve, reject) => {
          //     router.push(route, resolve, reject);
          //   });
          // };
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(access_token => {
            // Make sure to assign access_token according to your response.
            // Check: https://pixinvent.ticksy.com/ticket/2413870
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            resolve(axios(originalRequest))
          })
        })
        return retryOriginalRequest
      }
      return Promise.reject(error)
    })
  },
  login (email, pwd) {
    // return axios.post('http://api.dev.prolift.dev-ittest.ru/api/auth/login', {
    return axios.post('/api/auth/login', {
      email,
      password: pwd
    })
  },
  registerUser (name, email, pwd) {
    return axios.post('/api/auth/register', {
      displayName: name,
      email,
      password: pwd
    })
  },
  refreshToken () {
    // return axios.post('http://api.dev.prolift.dev-ittest.ru/api/auth/refresh', {refreshToken: sessionStorage.getItem('refreshToken')})
    return axios.post('/api/auth/refresh', {refresh_token: sessionStorage.getItem('refreshToken')})
  }
}
