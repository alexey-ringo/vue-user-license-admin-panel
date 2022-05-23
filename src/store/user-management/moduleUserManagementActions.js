/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'
const front = process.env.VUE_APP_FRONT
export default {
  addUser ({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER')
      axios.post('/api/admin/users', item)
        .then((response) => {
          // commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  addLicense ({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER')
      axios.post('/api/admin/licenses', item)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUsers ({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER')
      axios.get('/api/admin/users', {
        params: {
          page: params.page,
          limit: params.limit,
          filters: params.filters,
          sorted: params.sorted
        }
      })
        .then((response) => {
          commit('SET_USERS', response.data.items)
          commit('SET_PER_PAGE', response.data.perPage)
          commit('SET_TOTAL_ITEMS', response.data.totalItems)
          commit('SET_TOTAL_PAGES', response.data.totalPages)
          commit('SET_CURRENT_PAGE', response.data.currentPage)
          commit('SET_ITEM_COUNT', response.data.itemCount)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchCountries ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER')
      axios.get('/api/admin/countries')
        .then((response) => {
          commit('SET_COUNTRIES', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUser ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER')
      axios.get(`/api/admin/users/${userId}`)
        .then((response) => {
          commit('SET_USER', response.data)
          commit('SET_LICENCES_FOR_USER', response.data.licenses)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateUser ({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER');
      axios.patch(`/api/admin/users/${item.id}`, item)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  changePassword ({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER');
      axios.patch(`/api/admin/users/password/${item.id}`, item)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  checkActiveLicenseForUser ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER')
      axios.get(`/api/admin/licenses/${userId}`)
        .then((response) => {
          if (response.data == true) {
            commit('SET_LICENSE_STATUS_FOR_USER', true)
          }
          if (response.data == false) {
            commit('SET_LICENSE_STATUS_FOR_USER', false)
          }
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeLicense ({ commit }, licenseId) {
    return new Promise((resolve, reject) => {
      commit('SET_BEARER')
      axios.delete(`/api/admin/licenses/${licenseId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
    authUser ({ commit }, userId) {
        return new Promise((resolve, reject) => {
            commit('SET_BEARER')
            axios.get(`/api/admin/users/auth/${userId}`)
                .then((response) => {
                    resolve({response, front})
                })
                .catch((error) => { reject(error) })
        })
    },
}
