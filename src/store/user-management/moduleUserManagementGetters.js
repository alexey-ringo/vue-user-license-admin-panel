/*=========================================================================================
  File Name: moduleCalendarGetters.js
  Description: Calendar Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  getUsers: state => state.users,
  getLicenses: state => state.licenses,
  getCountries: state => state.countries,
  getUser: state => state.user,

  getPerPage: state => state.perPage,
  getTotalItems: state => state.totalItems,
  getTotalPages: state => state.totalPages,
  getCurrentPage: state => state.currentPage,
  getItemCount: state => state.itemCount,
  getLicenseStatus: state => state.licenseStatus
}
