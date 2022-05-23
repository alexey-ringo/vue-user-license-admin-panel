<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-chamge-password">
    <div class="mb-5 flex items-center">
      <div class="flex items-baseline"><h3>Смена пароля для</h3>
        <div class="ml-3 flex items-center"><span>{{ user.full_name }}</span>
          <vs-icon class="ml-1" icon="person"></vs-icon>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-8">
      <div>
        <p class="font-medium mb-4">{{ user.email }}</p>
      </div>
    </div>
    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input type="password" class="w-full mt-4" label="Новый пароль:" v-model="newPassword"
                  v-validate="'required|min:8'" name="password"/>
        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <vs-input type="password" class="w-full mt-4" label="Подтверждение нового пароля:" v-model="confirmPassword"
                  v-validate="'required|min:8'" name="password"/>
        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <span class="text-danger text-sm" v-if="password_no_match">{{ password_no_match }}</span>
      </div>
      <div class="vx-col w-full">
        <span class="text-danger text-sm" v-if="password_no_rule">{{ password_no_rule }}</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="changePassword" :disabled="!validateForm">Изменить</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="turnBack">Отмена</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Store Module
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    vSelect,
    Datepicker
  },
  data () {
    return {
      newPassword: '',
      confirmPassword: '',
      password_no_match: null,
      password_no_rule: null
    }
  },
  computed: {
    user () {
      return this.$store.getters['userManagement/getUser']
    },
    validateForm () {
      return !this.errors.any() && this.matchPasswords() && this.checkPasswordAccordingToRule()
    }
  },
  watch: {
    newPassword (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal.length === 0 && this.confirmPassword.length === 0) {
          this.$validator.reset()
        }
      }
    },
    confirmPassword (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal.length === 0 && this.newPassword.length === 0) {
          this.$validator.reset()
        }
      }
    },
  },
  methods: {
    changePassword () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const passwordObj = {
            id: this.$route.params.userId,
            new_password: this.newPassword,
            confirm_password: this.confirmPassword
          }
          this.$store.dispatch('userManagement/changePassword', passwordObj)
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Пароль редактируемого пользователя успешно изменен',
                color: 'success',
                icon: 'icon-check',
                position: 'top-center'
              })
              this.$router.push({name: 'user-list'})
            })
            .catch(error => {
              //   this.$vs.loading.close()
              this.$vs.notify({
                title: 'Ошибка при изменении пароля пользователя',
                text: error.response.data['error-message'],
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            })
        }
      })
    },
    matchPasswords () {
      if (this.newPassword.length < 8) {
        this.password_no_match = null
        return true
      }
      if (this.newPassword === this.confirmPassword) {
        this.password_no_match = null
        return true
      }
      this.password_no_match = 'Новый пароль не совпадает с его подтверждением'
      return false
    },
    checkPasswordAccordingToRule () {
      if (this.newPassword.length < 8) {
        this.password_no_rule = null
        return true
      }
      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&._]{8,}$/
      const result = this.newPassword.match(re)
      if (result) {
        this.password_no_rule = null
        return true
      }
      this.password_no_rule = 'Пароль обязательно должен содержать буквы латинского алфавита и цифры!'
    },
    turnBack () {
      this.$router.push({name: 'user-list'})
    }
  },
  created () {
    // if (!this.$store.getters['getAuthUser']) {
    // this.$store.dispatch('fetchAuthUser')
    // }
  }
}

</script>