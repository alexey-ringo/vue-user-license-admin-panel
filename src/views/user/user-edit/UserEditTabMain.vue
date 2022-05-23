<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab">
    <div class="mb-5 flex items-center">
      <div class="flex items-baseline"><h3><span>{{user.full_name}}</span></h3><div class="ml-3 flex items-center" ><span>{{user.email}}</span><vs-icon class="ml-1" icon="person"></vs-icon></div></div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
<!--        <vs-input class="w-full mt-4" label="Username" v-model="full_name" v-validate="'required|alpha_num'" name="username" />-->
<!--        <span class="text-danger text-sm"  v-show="errors.has('username')">{{ errors.first('username') }}</span>-->

        <vs-input class="w-full mt-4" label="Полное имя:" v-model="full_name" v-validate="'required'" name="username" />
        <span class="text-danger text-sm"  v-show="errors.has('username')">{{ errors.first('username') }}</span>


        <vs-input class="w-full mt-4" label="Email:" v-model="email" type="email" v-validate="'required|email'" name="email" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

        <vs-input class="w-full mt-4" label="Компания:" v-model="company" v-validate="'required'" name="company" />
        <span class="text-danger text-sm"  v-show="errors.has('company')">{{ errors.first('company') }}</span>

        <div class="mt-4">
          <label class="vs-input--label">Страна:</label>
          <select v-model="country_id" class="w-full select-css" required>
            <option v-for="country in countries" :value="country.id" :key="country.id">
              {{ country.name }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Язык:</label>
          <select v-model="language" class="w-full select-css" required>
            <option v-for="item in languageOptions" :value="item.value" :key="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>

      </div>

      <div class="vx-col md:w-1/2 w-full">

        <div class="mt-4">
          <label class="vs-input--label">Статус активности:</label>
          <select v-model="status" class="w-full select-css" required :disabled="!canAuthUserEditRoleAndStatus">
            <option v-for="item in statusOptions" :value="item.value" :key="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Роль:</label>
          <select v-model="role" class="w-full select-css" required :disabled="!canAuthUserEditRoleAndStatus">
            <option v-for="item in roleOptions" :value="item.value" :key="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Permissions -->
    <vx-card class="mt-base" no-shadow card-border>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Статусы</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="vx-row">
        <div class="vx=col w-full">
          <vs-alert icon-pack="feather" icon="icon-info" class="my-4" color="success" :active="user.is_active">
            <span>Пользователь активирован</span>
          </vs-alert>
          <vs-alert icon-pack="feather" icon="icon-info" class="my-4" color="danger" :active="!user.is_active">
            <span>Пользователь деактивирован</span>
          </vs-alert>
          <vs-alert icon-pack="feather" icon="icon-info" class="my-4" color="success" :active="hasUserActiveLicense">
            <span>У пользователя есть активная лицензия</span>
          </vs-alert>
          <vs-alert icon-pack="feather" icon="icon-info" class="my-4" color="danger" :active="!hasUserActiveLicense">
            <span>У пользователя нет активной лицензии</span>
          </vs-alert>
        </div>
      </div>

    </vx-card>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="updateUser" :disabled="!validateForm">Сохранить</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="turnBack">Отмена</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  data () {
    return {
      statusOptions: [
        { label: 'Active',  value: true },
        { label: 'Deactivated',  value: false }
      ],
      languageOptions: [
        { label: 'Русский',  value: 'ru' },
        { label: 'English',  value: 'en' }
      ],
      full_name: null,
      email: null,
      company: null,
      country_id: null,
      language: 'ru',
      status: false,
      role: null
    }
  },
  computed: {
    user () {
      const user = this.$store.getters['userManagement/getUser']
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.full_name = user.full_name
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.email = user.email
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.company = user.company
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.language = user.language
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.country_id = user.country_id
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.status = user.is_active
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.role = user.role

      return user
    },
    hasUserActiveLicense () {
      return this.$store.getters['userManagement/getLicenseStatus']
    },
    countries () {
      return this.$store.getters['userManagement/getCountries']
    },
    canAuthUserEditRoleAndStatus () {
      if (this.authUser) {
        if (this.authUser.id === this.user.id) {
          return false
        }
        if (this.authUser.role === 2 && this.user.role === 3) {
          return false
        }
        return true
      }
      return false
    },
    roleOptions () {
      if (this.authUser) {
        if (this.authUser.role === 2) {
          return [
            {
              label: 'User',
              value: 1
            },
            {
              label: 'Admin',
              value: 2
            }
          ]
        }
        return [
          {
            label: 'User',
            value: 1
          },
          {
            label: 'Admin',
            value: 2
          },
          {
            label: 'Superadmin',
            value: 3
          }
        ]
      }
      return [
        {
          label: 'User',
          value: 1
        }
      ]

    },
    authUser () {
      return this.$store.getters['getAuthUser']
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    updateUser () {
      const userObj = {
        id: this.user.id,
        full_name: this.full_name,
        email: this.email,
        password: this.password,
        role: this.role,
        company: this.company,
        country_id: this.country_id,
        language: this.language,
        is_active: this.status
      }
      this.$store.dispatch('userManagement/updateUser', userObj)
        .then(() => {
          this.$store.dispatch('userManagement/fetchUser', this.$route.params.userId)
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Данные пользователя успешно сохранены',
                color: 'success',
                icon: 'icon-check',
                position:'top-center'
              })
            })
        })
        .catch(error => {
          //    this.$vs.loading.close()
          this.$vs.notify({
            title: 'Ошибка при редактировании данных пользователя',
            text: error.response.data['error-message'],
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    turnBack () {
      this.$router.push({name: 'user-list'})
    }
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
