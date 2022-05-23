<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-create">

    <vx-card>
      <div class="mb-5 flex items-center">
        <div class="flex items-baseline"><h3>Создание лицензии для</h3><div class="ml-3 flex items-center" ><span>{{user.full_name}}</span><vs-icon class="ml-1" icon="person"></vs-icon></div></div>
      </div>
      <div id="user-edit-tab-info">

        <!-- Content Row -->
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full">
            <div class="mt-4">
              <datepicker placeholder="Начало активации лицензии"
                          v-model="licenseFrom"
                          :disabled-dates="datepickerState.disabledDates"
                          :monday-first="true"
                          :use-utc="true"
              ></datepicker>
            </div>            
          </div>

          <div class="vx-col md:w-1/2 w-full">
            <div class="mt-4">
              <datepicker placeholder="Окончание активации лицензии"
                          v-model="licenseTo"
                          :disabled-dates="datepickerState.disabledDates"
                          :monday-first="true"
                          :use-utc="true"
              ></datepicker>
            </div>
          </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-8 flex flex-wrap items-center justify-end">
              <vs-button class="ml-auto mt-2" @click="createLicense" :disabled="!validateForm">Создать лицензию</vs-button>
              <vs-button class="ml-4 mt-2" type="border" color="warning" @click="turnBack">Отмена</vs-button>
            </div>
          </div>
        </div>
      </div>


    </vx-card>
  </div>
</template>

<script>
// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      licenseFrom: null,
      licenseTo: null,
      datepickerState: {}
    }
  },
  watch: {
    licenseFrom (newVal, oldVal) {
      if (newVal !== oldVal) {
        // newVal.setHours(3, 0, 0, 0)
        newVal.setUTCHours(0, 0, 0, 0)
      }
    },
    licenseTo (newVal, oldVal) {
      if (newVal !== oldVal) {
        // newVal.setHours(26, 59, 59, 0)
        newVal.setUTCHours(23, 59, 59, 0)
      }
    },
  },
  computed: {
    user () {
      return this.$store.getters['userManagement/getUser']
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    createLicense () {
      this.$validator.validateAll().then(result => {
        if (result && this.licenseFrom && this.licenseTo) {
          const licenseObj = {
            user_id: this.$route.params.userId,
            email: this.user.email,
            full_name: this.user.full_name,
            company: this.user.company,
            language: this.user.language,
            from: this.licenseFrom,
            to: this.licenseTo
          }
          this.$store.dispatch('userManagement/addLicense', licenseObj)
            .then(() => {            
              this.$vs.notify({
                title: 'Success',
                text: 'Новая лицензия для пользователя успешно добавлена',
                color: 'success',
                icon: 'icon-check',
                position: 'top-center'
              })               
              this.$router.push({name: 'user-edit', params: {userId: this.$route.params.userId}})
            })
            .catch(error => {
              this.$vs.notify({
                title: 'Ошибка при создании новой лицензии',
                text: error.response.data['error-message'],
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            })
        }
      })
    },
    turnBack () {
      this.$router.push({name: 'user-edit', params: {userId: this.$route.params.userId}})
    },
    getPreviousDay () {
      const dayMilliseconds = 24*60*60*1000
      const previousDay = new Date()
      previousDay.setTime(previousDay.getTime() - dayMilliseconds)
      this.datepickerState = {
        disabledDates: {
          to: previousDay
        }
      }
    }
  },
  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.$store.dispatch('userManagement/fetchCountries').catch(err => { console.error(err) })
    this.getPreviousDay()
  }
}

</script>
