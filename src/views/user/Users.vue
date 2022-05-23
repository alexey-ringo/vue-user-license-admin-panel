<template>
  <vx-card>
    <div class="mb-1 flex items-center">
      <div class="flex items-baseline"><h3>Пользователи</h3>
        <div class="ml-3 flex items-center"><span>{{ totalItems }}</span>
          <vs-icon class="ml-1" icon="person"></vs-icon>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-between items-center mb-1">
      <div>
      </div>
      <vs-button type="border" color="danger" @click="toCreateUser">Создать пользователя</vs-button>
    </div>
    <div class="mb-5 flex items-center">
      <div>
        <label class="vs-input--label">ID</label>
        <vs-input class="ml-2 large-width" icon="search" v-model="user_id"/>
      </div>
      <div>
        <label class="vs-input--label">Полное имя</label>
        <vs-input class="ml-2 large-width" icon="search" v-model="full_name"/>
      </div>
      <div>
        <label class="vs-input--label">Email</label>
        <vs-input class="ml-2 large-width" icon="search" v-model="email"/>
      </div>
      <div class="ml-6">
        <label class="vs-input--label">Сорт</label>
        <vs-checkbox v-model="sorted">
          <span class="sort-arrow" v-if="sorted">&#8593;</span>
          <span class="sort-arrow" v-else>&#8595;</span>
        </vs-checkbox>
      </div>
    </div>
    <div class="mb-5 flex items-center">
      <div>
        <label class="vs-input--label">Статус</label>
        <v-select
            class="vs-width ml-2 style-chooser"
            placeholder="Все статусы"
            v-model="status"
            :clearable="false"
            :options="statusOptions"
            name="role"
        />
      </div>
      <div>
        <label class="vs-input--label">Роль</label>
        <v-select
            class="vs-width ml-2 style-chooser"
            placeholder="Все роли"
            :clearable="false"
            :options="roleOptions"
            v-model="role"
            name="role"
        />
      </div>
      <div>
        <label class="vs-input--label">Лицензии</label>
        <v-select
            class="vs-width ml-2 style-chooser"
            placeholder="Все типы лицензий"
            v-model="license_status"
            :clearable="false"
            :options="licenseStatusOptions"
            name="role"/>
      </div>

      <div class="ml-6">
        <vs-button @click="clearFilters" class="mt-6" color="primary" type="border" icon="cancel"></vs-button>
      </div>
    </div>

    <vs-table
        :sst="true"
        max-items="5"
        stripe
        :hoverFlat="true"
        :data="users">
      <template slot="thead">
        <vs-th>ID</vs-th>
        <vs-th>Полное имя</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Роль</vs-th>
        <vs-th>Статус</vs-th>
        <vs-th>Лицензия, до:</vs-th>
        <vs-th>Компания</vs-th>
        <vs-th>Страна</vs-th>
        <vs-th>Язык</vs-th>
        <vs-th></vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="index" v-for="(tr, index) in data">
          <vs-td>
            <router-link :to="{name: 'user-edit', params: {userId: data[index].id}}">
              {{ data[index].id }}
            </router-link>
          </vs-td>
          <vs-td>
            <router-link :to="{name: 'user-edit', params: {userId: data[index].id}}">
            <span class="custom-text-bold">
            {{ data[index].full_name }}
            </span>
            </router-link>
          </vs-td>
          <vs-td>
            <router-link :to="{name: 'user-edit', params: {userId: data[index].id}}">
              <span class="custom-text-bold">
            {{ data[index].email }}
                </span>
            </router-link>
          </vs-td>
          <vs-td>
            <span v-if="data[index].role === 1">Пользователь</span>
            <span v-if="data[index].role === 2">Админ</span>
            <span v-if="data[index].role === 3">СуперАдмин</span>
          </vs-td>
          <vs-td>
            <span v-if="data[index].is_active">Активен</span>
            <span v-if="!data[index].is_active">Отключен</span>
          </vs-td>
          <vs-td>
            <span
                v-if="data[index].licenses[0] && !isExpiringLicense(data[index].licenses[0].active_to) && !isDisabledLicense (data[index].licenses[0].active_to)">
              {{formatDateTime(data[index].licenses[0].active_to)}}</span>
            <span
                v-if="data[index].licenses[0] && isExpiringLicense(data[index].licenses[0].active_to) && !isDisabledLicense (data[index].licenses[0].active_to)"
                class="text-warning">{{ formatDateTime(data[index].licenses[0].active_to) }}</span>
            <span
                v-if="data[index].licenses[0] && !isExpiringLicense(data[index].licenses[0].active_to) && isDisabledLicense (data[index].licenses[0].active_to)"
                class="text-danger">{{ formatDateTime(data[index].licenses[0].active_to) }}</span>
            <span
                v-if="data[index].licenses[0] && isExpiringLicense(data[index].licenses[0].active_to) && isDisabledLicense (data[index].licenses[0].active_to)"
                class="text-danger">{{ formatDateTime(data[index].licenses[0].active_to) }}</span>
            <span v-if="!data[index].licenses[0]" class="text-danger">Отсутствует</span>
          </vs-td>
          <vs-td>{{ data[index].company }}</vs-td>
          <vs-td>{{ data[index].country.name }}</vs-td>
          <vs-td>{{ data[index].language }}</vs-td>
          <vs-td><vs-button class="ml-auto mt-2 small" @click="authUser(data[index].id)"><i class="vs-icon notranslate icon-scale vs-button--icon  feather icon-user-plus null" style="order: 0; margin-right: 0px; margin-left: 0px;"></i></vs-button></vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <div class="mt-5 flex justify-end">
      <vs-pagination :total="totalPages" v-model="currentPageModel"></vs-pagination>
    </div>
  </vx-card>
</template>

<script>
// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import vSelect from 'vue-select'
import moment from 'moment'

export default {
  components: {
    vSelect
  },
  data: () => ({
    currentPageModel: 1,
    maxPages: 15,
    user_id: '',
    email: '',
    full_name: '',
    status: {},
    role: {},
    license_status: {},
    sorted: false,
    statusOptions: [
      { label: 'Активен',  value: 1 },
      { label: 'Отключен',  value: 2 },
      { label: 'Все статусы',  value: 5 }
    ],
    roleOptions: [
      { label: 'User',  value: 1 },
      { label: 'Admin',  value: 2 },
      { label: 'Superadmin',  value: 3 },
      { label: 'Все роли',  value: 5 }
    ],
    licenseStatusOptions: [
      { label: 'Активна',  value: 1 },
      { label: 'Истекает',  value: 2 },
      { label: 'Неактивна',  value: 3 },
      { label: 'Отложена',  value: 4 },
      { label: 'Все типы',  value: 5}
    ]
  }),
  created () {
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    // if (!this.$store.getters['getAuthUser']) {
    this.$store.dispatch('fetchAuthUser')
    // }
    const params = {
      page: 1,
      limit: 10,
      sorted: 0
    }
    this.$store.dispatch('userManagement/fetchUsers', params)
      .then((response) => {
        if (response.data) {
          this.maxPages = Math.min(response.data.totalPages, 15)
        }
      })
      .catch(err => { console.error(err) })
  },
  watch: {
    currentPageModel (newVal, oldVal) {
      if (newVal !== oldVal) {
        let params = {}
        if ((this.user_id && this.user_id > 0) || (this.email && this.email > 2) || (this.full_name && this.full_name > 2)
            || (this.status && Object.entries(this.status).length !== 0) || (this.role && Object.entries(this.role).length !== 0)
            || (this.license_status && Object.entries(this.license_status).length !== 0)) {
          params = {
            page: newVal,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
        } else {
          params = {
            page: newVal,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0
          }
        }
        this.$store.dispatch('userManagement/fetchUsers', params).catch(err => { console.error(err) })
      }
    },
    user_id (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal.length && newVal.length > 0) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: newVal,
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
        if (newVal.length === 0) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
      }
    },
    email (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal.length && newVal.length > 2) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: newVal,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
        if (newVal.length === 0) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
      }
    },
    full_name (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal.length && newVal.length > 2) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: newVal,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
        if (newVal.length === 0) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
      }
    },
    status (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && Object.entries(newVal).length !== 0 && (newVal.value === 1 || newVal.value === 2)) {
          let boolStatusParam = true
          if (newVal.value === 1) {
            boolStatusParam = true
          }
          if(newVal.value === 2) {
            boolStatusParam = false
          }
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              status: boolStatusParam,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
        if (!newVal || (newVal.value === 5)) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
      }
    },
    role (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && Object.entries(newVal).length !== 0 && (newVal.value === 1 || newVal.value === 2 || newVal.value === 3)) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              role: newVal.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
        if (!newVal || newVal.value === 5) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              license_status: this.license_status.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
      }
    },
    license_status (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && Object.entries(newVal).length !== 0
            && (newVal.value === 1 || newVal.value === 2 || newVal.value === 3 || newVal.value === 4)) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value,
              license_status: newVal.value
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
        if (!newVal || newVal.value === 5) {
          const params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: this.sorted === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value             
            }
          }
          this.$store.dispatch('userManagement/fetchUsers', params).catch(err => {
            console.error(err)
          })
        }
      }
    },
    sorted (newVal, oldVal) {
      if (newVal !== oldVal) {
        let params = {}
        if ((this.user_id && this.user_id > 0) || (this.email && this.email > 2) || (this.full_name && this.full_name > 2)
            || (this.status && Object.entries(this.status).length !== 0) || (this.role && Object.entries(this.role).length !== 0)
            || (this.license_status && Object.entries(this.license_status).length !== 0)) {
          params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: newVal === true ? 1 : 0,
            filters: {
              user_id: this.user_id,
              email: this.email,
              full_name: this.full_name,
              status: this.status.value,
              role: this.role.value,
              license_status: this.license_status.value
            }
          }
        } else {
          params = {
            page: this.currentPage,
            limit: this.perPage,
            sorted: newVal === true ? 1 : 0
          }
        }
        this.$store.dispatch('userManagement/fetchUsers', params).catch(err => { console.error(err) })
      }
    }
  },
  computed: {
    users () {
      // return this.$store.state.userManagement.users
      return this.$store.getters['userManagement/getUsers']
    },
    countries () {
      return this.$store.getters['userManagement/getCountries']
    },
    perPage () {
      return this.$store.getters['userManagement/getPerPage']
    },
    totalItems () {
      return this.$store.getters['userManagement/getTotalItems']
    },
    totalPages () {
      return this.$store.getters['userManagement/getTotalPages']
    },
    currentPage () {
      const currentPage = this.$store.getters['userManagement/getCurrentPage']
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentPageModel = currentPage
      return currentPage
    },
    itemCount () {
      return this.$store.getters['userManagement/getItemCount']
    }
    // currentPage: {
    //   get () {
    //     return this.$store.getters['userManagement/getCurrentPage'];
    //   },
    //   set (val) {
    //     if (val) {
    //       this.$store.commit('userManagement/SET_CURRENT_PAGE', val);
    //       console.log(val)
    //       console.log(this.perPage)
    //       const params = {
    //         page: val,
    //         limit: this.perPage,
    //         filters: {
    //         }
    //       }
    //       this.$store.dispatch('userManagement/fetchUsers', params).catch(err => { console.error(err) })
    //       // this.$router.push({ name: 'user-list', query: { page: val, limit: this.perPage }})
    //     }
    //   }
    // },
  },
  methods:{
    toCreateUser () {
      this.$router.push({ name: 'user-create' })
    },
    formatDateTime (dateTime, format = 'DD.MM.YYYY') {
      return moment.utc(dateTime).format(format)
    },
    authUser (id) {
      this.$store.dispatch('userManagement/authUser', id)
          .then((res) => {
            let u = new URLSearchParams(res.response.data).toString();
            //console.log(res.front + 'auth/admin-login?' + u);
            window.location.href = res.front + 'auth/admin-login?' + u;
          })
          .catch(error => {
            //
          })
    },
    clearFilters () {
      this.user_id = ''
      this.email = ''
      this.full_name = ''
      this.status = {}
      this.role = {}
      this.license_status = {}
      this.sorted = 0
      const params = {
        page: 1,
        limit: 10,
        sorted: 0
      }
      this.currentPageModel = 1
      this.$store.dispatch('userManagement/fetchUsers', params)
    },
    isExpiringLicense (date) {
      if (!date) {
        return true
      }      
      const dateExpired = new Date()
      dateExpired.setDate(dateExpired.getDate() + 14)
      const licenseDate = new Date(date)
      if (licenseDate > dateExpired) {
        return false
      }
      return true

    },
    isDisabledLicense (date) {
      if (!date) {
        return true
      }
      const now = new Date
      const licenseDate = new Date(date)
      if (licenseDate > now) {
        return false
      }
      return true
    }
  }
}
</script>

<style>
.small-width{
  width: 6rem;
}
.middle-width{
  width: 11rem;
}
.state_ok{
  width: 7px;
  height: 7px;
  background: green;
  border-radius: 9999px;
  margin: 0 auto;
}
.state_failed{
  width: 7px;
  height: 7px;
  background: red;
  border-radius: 9999px;
  margin: 0 auto;
}
th.center-th .vs-table-text{
  justify-content: center;
}
.vs-width {
  width: 14rem;
}
.large-width {
  width: 14rem;
}
.custom-text-bold {
  font-weight: bold;
}
.sort-arrow {
  font-size: x-large;
}
.pd-right-null {
  padding-right: 0 !important;
}

</style>
