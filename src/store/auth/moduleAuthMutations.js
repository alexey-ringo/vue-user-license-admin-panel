/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '../../http/axios/index.js'

export default {
  SET_BEARER (state, accessToken) {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Authorization'] = `Bearer ${  accessToken}`
  }
  // SET_ACCESS_TOKEN (state, accessToken) {
  //   state.stateAccessToken = accessToken
  //   sessionStorage.setItem('accessToken', accessToken)
  //   // console.log('I am SET_TOKEN mutator')
  // },
  // SET_REFRESH_TOKEN (state, refreshToken) {
  //   state.stateRefreshToken = refreshToken
  //   sessionStorage.setItem('refreshToken', refreshToken)
  //   // console.log('I am SET_TOKEN mutator')
  // },
  // INIT_ACCESS_TOKEN_FROM_STORAGE (state, accessToken) {
  //   state.stateAccessToken = accessToken
  //   // console.log('I am INIT_TOKEN_FROM_STORAGE mutator')
  // },
  // INIT_REFRESH_TOKEN_FROM_STORAGE (state, refreshToken) {
  //   state.stateRefreshToken = refreshToken
  //   // console.log('I am INIT_TOKEN_FROM_STORAGE mutator')
  // },
  // SET_AUTH_USER_INFO (state, accessToken) {
  //   state.stateToken = accessToken
  //   sessionStorage.setItem('accessToken', accessToken)
  //   // console.log('I am SET_TOKEN mutator')
  // }
}
