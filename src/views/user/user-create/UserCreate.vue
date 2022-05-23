<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <vx-card>
      <form>
        <!-- Content Row -->
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full">
            <vs-input class="w-full mt-4" label="Полное имя:" v-model="full_name" v-validate="'required'" name="full_name" />
            <span class="text-danger text-sm"  v-show="errors.has('full_name')">{{ errors.first('full_name') }}</span>

            <vs-input class="w-full mt-4" label="Email:" v-model="email" type="email" v-validate="'required|email'" name="email" />
            <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

            <vs-input type="password" class="w-full mt-4" label="Пароль:" v-model="password" v-validate="'required|min:8'" name="password" />
            <span class="text-danger text-sm"  v-show="errors.has('password')">{{ errors.first('password') }}</span>
            <div class="vx-col w-full">
              <span class="text-danger text-sm" v-if="password_no_rule">{{ password_no_rule }}</span>
            </div>

            <vs-input class="w-full mt-4" label="Компания:" v-model="company" v-validate="'required'" name="company" />
            <span class="text-danger text-sm"  v-show="errors.has('company')">{{ errors.first('company') }}</span>

            <div class="mt-4">
              <label class="vs-input--label">Страна:</label>
              <select v-model="country_id" class="w-full select-css" v-validate="'required'" name="country">
                <option v-for="country in countries" :value="country.id" :key="country.id">
                  {{ country.name }}
                </option>
              </select>
            </div>
            <span class="text-danger text-sm"  v-show="errors.has('country')">{{ errors.first('country') }}</span>

            <div class="mt-4">
              <label class="vs-input--label">Язык:</label>
              <select v-model="language" class="w-full select-css" v-validate="'required'" name="language">
                <option v-for="item in languageOptions" :value="item.value" :key="item.value">
                  {{ item.label }}
                </option>
              </select>
            </div>
            <span class="text-danger text-sm"  v-show="errors.has('language')">{{ errors.first('language') }}</span>
          </div>

          <div class="vx-col md:w-1/2 w-full">
            <div class="mt-4">
              <label class="vs-input--label">Роль:</label>
              <v-select v-model="role" :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
              <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
            </div>

            <div class="mt-4">
              <label class="vs-input--label">Начало срока активации лицензии:</label>
              <datepicker
                          v-model="licenseFrom"
                          :disabled-dates="datepickerState.disabledDates"
                          :monday-first="true"
                          :use-utc="true"
                          ></datepicker>
            </div>

            <div class="mt-4">
              <label class="vs-input--label">Окончание срока активации лицензии:</label>
              <datepicker
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
              <vs-button class="ml-auto mt-2" @click="createUser" :disabled="!validateForm">Создать</vs-button>
              <vs-button class="ml-4 mt-2" type="border" color="warning" @click="turnBack">Отмена</vs-button>
            </div>
          </div>
        </div>
      </form>
    </vx-card>
</template>

<script>
// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'

export default {
  components: {
    vSelect,
    Datepicker
  },
  data () {
    return {
      full_name: null,
      email: null,
      password: null,
      role: {label: 'User', value: 1},
      company: null,
      country_id: null,
      language: null,
      licenseFrom: null,
      licenseTo: null,
      languageOptions: [
        { label: 'Русский',  value: 'ru' },
        { label: 'English',  value: 'en' }
      ],
      password_no_rule: null,
      datepickerState: {}
    }
  },
  watch: {
    licenseFrom (newVal, oldVal) {
      if (newVal !== oldVal) {
        // newVal.setHours(0, 0, 0, 0)
        newVal.setUTCHours(0, 0, 0, 0)
      }
    },
    licenseTo (newVal, oldVal) {
      if (newVal !== oldVal) {
        // newVal.setHours(23, 59, 59, 0)
        newVal.setUTCHours(23, 59, 59, 0)
      }
    },
    // full_name (newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     if (newVal === '' && newVal.length === 0) {
    //       this.errors.error.remove('full_name')
    //
    //       // this.$validator.reset()
    //     }
    //   }
    // },
  },
  computed: {
    countries () {
      return this.$store.getters['userManagement/getCountries']
    },
    roleOptions () {
      const authUser = this.$store.getters['getAuthUser']
      if (authUser) {
        if (authUser.role === 2) {
          return [
            { label: 'User',  value: 1 },
            { label: 'Admin',  value: 2 }
          ]
        }
        return [
          { label: 'User',  value: 1 },
          { label: 'Admin',  value: 2 },
          { label: 'Superadmin',  value: 3 }
        ]
      } else {
        // eslint-disable-next-line vue/no-async-in-computed-properties
        this.$store.dispatch('fetchAuthUser').then(() => {
          if (authUser.role === 2) {
            return [
              { label: 'User',  value: 1 },
              { label: 'Admin',  value: 2 }
            ]
          }
          return [
            { label: 'User',  value: 1 },
            { label: 'Admin',  value: 2 },
            { label: 'Superadmin',  value: 3 }
          ]
        })
      }
    },
    validateForm () {
      return !this.errors.any() && this.checkPasswordAccordingToRule()
    }
  },
  methods: {
    createUser () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const userObj = {
            full_name: this.full_name,
            email: this.email,
            password: this.password,
            role: this.role.value,
            company: this.company,
            country_id: this.country_id,
            language: this.language
          }

          this.$store.dispatch('userManagement/addUser', userObj)
            .then((response) => {
              if (this.licenseFrom && this.licenseTo) {
                const licenseObj = {
                  user_id: response.data.id,
                  email: this.email,
                  full_name: this.full_name,
                  company: this.company,
                  language: this.language,
                  from: this.licenseFrom,
                  to: this.licenseTo
                }
                this.$store.dispatch('userManagement/addLicense', licenseObj)
                  .then(() => {
                    this.$router.push({name: 'user-list'})
                  })
                  .catch(error => {
                    this.$vs.notify({
                      title: 'Ошибка при создании лицензии для нового пользователя',
                      text: error.response.data['error-message'],
                      iconPack: 'feather',
                      icon: 'icon-alert-circle',
                      color: 'danger'
                    })
                  })
              }
              this.$router.push({name: 'user-list'})
            })
            .catch(error => {
              //   this.$vs.loading.close()
              this.$vs.notify({
                title: 'Ошибка при создании нового пользователя',
                text: error.response.data['error-message'],
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            })
        }
      })
    },
    resetData () {
      this.full_name = null;
      this.email = null;
      this.password = null;
      this.role = {
        label: 'User',
        value: 1
      };
      this.company = null;
      this.country_id = null;
      this.language = null;
      this.licenseFrom = null;
      this.licenseTo = null;
    },
    checkPasswordAccordingToRule () {
      if (!this.password) {
        this.password_no_rule = null
        return true
      }
      if (this.password.length < 8) {
        this.password_no_rule = null
        return true
      }
      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&._]{8,}$/
      const result = this.password.match(re)
      if (result) {
        this.password_no_rule = null
        return true
      }
      this.password_no_rule = 'Пароль обязательно должен содержать буквы латинского алфавита и цифры!'
      return false
    },
    turnBack () {
      this.$router.push({name: 'user-list'})
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
    // if (!this.$store.getters['userManagement/getCountries']) {
      this.$store.dispatch('userManagement/fetchCountries').catch(err => { console.error(err) })
    // }
    // if (!this.$store.getters['getAuthUser']) {
      this.$store.dispatch('fetchAuthUser')
    // }
    this.getPreviousDay()
  }
}

</script>

<style>
/* class applies to select element itself, not a wrapper element */
.select-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%; /* useful when width is set to anything other than 100% */
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  /* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient.
      for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference

  */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
  background-position: right .7em top 50%, 0 0;
  /* icon size, then gradient */
  background-size: .65em auto, 100%;
}

/* Hide arrow icon in IE browsers */
.select-css::-ms-expand {
  display: none;
}

/* Hover style */
.select-css:hover {
  border-color: #888;
}

/* Focus style */
.select-css:focus {
  border-color: #aaa;
  /* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}

/* Set options to normal weight */
.select-css option {
  font-weight: normal;
}

/* Support for rtl text, explicit support for Arabic and Hebrew */
*[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
  background-position: left .7em top 50%, 0 0;
  padding: .6em .8em .5em 1.4em;
}

/* Disabled styles */
.select-css:disabled, .select-css[aria-disabled=true] {
  color: graytext;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
}

.select-css:disabled:hover, .select-css[aria-disabled=true] {
  border-color: #aaa;
}


/*body {*/
/*  margin: 2rem;*/
/*}*/


</style>
