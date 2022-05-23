/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import axios from '@/http/axios'

export default {
  // eslint-disable-next-line no-unused-vars
  SET_BEARER (state) {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessToken')
  },
  SET_USERS (state, users) {
    state.users = users
  },
  SET_COUNTRIES (state, countries) {
    state.countries = countries
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_PER_PAGE (state, perPage) {
    state.perPage = perPage
  },
  SET_TOTAL_ITEMS (state, totalItems) {
    state.totalItems = totalItems
  },
  SET_TOTAL_PAGES (state, totalPages) {
    state.totalPages = totalPages
  },
  SET_CURRENT_PAGE (state, currentPage) {
    state.currentPage = currentPage
  },
  SET_ITEM_COUNT (state, itemCount) {
    state.itemCount = itemCount
  },
  SET_LICENCES_FOR_USER (state, licenses) {
    state.licenses = licenses
  },
  SET_LICENSE_STATUS_FOR_USER (state, status) {
    state.licenseStatus = status
  },
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.users.findIndex((u) => u.id === itemId)
    state.users.splice(userIndex, 1)
  }
}
