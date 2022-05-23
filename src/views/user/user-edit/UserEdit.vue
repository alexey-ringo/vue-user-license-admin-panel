<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-edit">

<!--    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">-->
<!--      <span>User record with id: {{ $route.params.userId }} not found. </span>-->
<!--      <span>-->
<!--        <span>Check </span><router-link :to="{name:'page-user-list'}" class="text-inherit underline">All Users</router-link>-->
<!--      </span>-->
<!--    </vs-alert>-->

    <vx-card v-if="user">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Основные" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <user-edit-tab-main class="mt-4" />
            </div>
          </vs-tab>
          <vs-tab label="Лицензии" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <user-edit-tab-licenses class="mt-4" />
            </div>
          </vs-tab>
          <vs-tab label="Смена пароля" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <user-edit-tab-change-password class="mt-4" />
            </div>
          </vs-tab>

        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import UserEditTabMain     from './UserEditTabMain.vue'
import UserEditTabLicenses     from './UserEditTabLicenses.vue'
import UserEditTabChangePassword     from './UserEditTabPassword.vue'

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

export default {
  components: {
    UserEditTabMain,
    UserEditTabLicenses,
    UserEditTabChangePassword
  },
  data () {
    return {
      // user_data: null,
      // user_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      activeTab: 0
    }
  },
  computed: {
    user () {
      return this.$store.getters['userManagement/getUser']
    },
    licenses () {
      return this.$store.getters['userManagement/getLicenses']
    }
  },
  methods: {

  },
  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.$store.dispatch('userManagement/fetchUser', this.$route.params.userId)
    this.$store.dispatch('userManagement/checkActiveLicenseForUser', this.$route.params.userId)
    // if (!this.$store.getters['userManagement/getCountries']) {
      this.$store.dispatch('userManagement/fetchCountries').catch(err => { console.error(err) })
    // }
    // if (!this.$store.getters['getAuthUser']) {
      this.$store.dispatch('fetchAuthUser')
    // }
  }
}

</script>
