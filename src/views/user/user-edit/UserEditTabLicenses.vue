<template>
  <div>
    <div class="mb-5 flex items-center">
      <div class="flex items-baseline"><h3>Лицензии для</h3><div class="ml-3 flex items-center" ><span>{{user.full_name}}</span><vs-icon class="ml-1" icon="person"></vs-icon></div></div>
    </div>

    <div class="flex flex-wrap justify-between items-center mb-8">
      <div>
        <p class="font-medium mb-4">{{user.email}}</p>
      </div>
      <vs-button type="border" color="danger" @click="createLicense">Создать лицензию</vs-button>
    </div>
    <vs-table
        :sst="true"
        max-items="5"
        stripe
        :hoverFlat = "true"
        :data="licenses">
      <template slot="thead">
        <vs-th>Дата создания</vs-th>
        <vs-th>Дата начала действия</vs-th>
        <vs-th>Дата окончания действия</vs-th>
        <vs-th>Удалить</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="index" v-for="(tr, index) in data">
          <vs-td>{{formatDateTime(data[index].created_at)}}</vs-td>
          <vs-td>{{formatDateTime(data[index].active_from)}}</vs-td>
          <vs-td>{{formatDateTime(data[index].active_to)}}</vs-td>
          <vs-td>
            <vs-button style="float: left;" @click="tokenLicense(data[index].token)" color="primary" type="border" icon="vpn_key" size="small"></vs-button>
            <vs-button type="border" color="danger" icon="cancel" size="small" @click="deleteLicense(data[index].id)" :disabled="!canAuthUserDeleteLicense"></vs-button>

          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <vs-popup class="holamundo" title="Лицензионный ключ" :active.sync="popupActiveToken">
      <div class="mb-5 flex items-center mr-4 ml-4">
        <p style="word-break: break-all">{{ this.token }}</p>
      </div>

      <div class="flex flex-wrap justify-between items-center mb-8 mr-4 ml-4">
        <vs-button v-clipboard="this.token">Скопировать ключ</vs-button>
        <vs-button @click="popupActiveToken = false" color="primary" type="filled">Закрыть</vs-button>
      </div>
    </vs-popup>

    <vs-popup title="Удаление лицензии для" :active.sync="popupActive">
        <div class="mb-5 flex items-center mr-4 ml-4">
          <div class="flex items-baseline"><h3><span>{{user.full_name}}</span></h3><div class="ml-3 flex items-center" ><span>{{user.email}}</span><vs-icon class="ml-1" icon="person"></vs-icon></div></div>
        </div>
      <div class="flex flex-wrap justify-between items-center mb-8 mr-4 ml-4">
        <vs-button @click="destroyLicense" color="danger" class="mr-6" type="filled">Удалить</vs-button>
        <vs-button @click="popupActive = false" color="primary" type="filled">Отмена</vs-button>
      </div>
    </vs-popup>


  </div>
</template>

<script>

import moment from 'moment'

export default {
  data: () => ({
    popupActive : false,
    popupActiveToken : false,
    token : '',
    deletedLicenseId: null
  }),
  watch: {
    popupActive (newVal, oldVal) {
      if (newVal !== oldVal && newVal === false) {
        this.deletedLicenseId = null
      }
    }
  },
  computed: {
    licenses () {
      return this.$store.getters['userManagement/getLicenses']
    },
    user () {
      return this.$store.getters['userManagement/getUser']
    },
    authUser () {
      return this.$store.getters['getAuthUser']
    },
    canAuthUserDeleteLicense () {
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
    }
  },
  methods: {
    openAlert (token) {
      this.$vs.dialog({
        color: 'primary',
        title: 'Dialog',
        text: token,
        accept:this.acceptAlert
      })
    },
    createLicense () {
      this.$router.push({name: 'license-create-for-user'})
    },
    deleteLicense (id) {
      if (this.deletedLicenseId) {
        this.deletedLicenseId = null
      }
      this.popupActive = true
      this.deletedLicenseId = id
    },
    tokenLicense (token) {
      this.token = token;
      this.popupActiveToken = true
    },
    destroyLicense () {
      if (this.deletedLicenseId) {
        this.$store.dispatch('userManagement/removeLicense', this.deletedLicenseId)
          .then(() => {
            this.$store.dispatch('userManagement/fetchUser', this.$route.params.userId)
            this.$store.dispatch('userManagement/checkActiveLicenseForUser', this.$route.params.userId)
            this.deletedLicenseId = null
            this.popupActive = false
          })
          .catch(error => {
            this.$vs.notify({
              title: 'Ошибка при удалении лицензии',
              text: error.response.data['error-message'],
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          })
      }
    },
    formatDateTime (dateTime, format = 'DD.MM.YYYY') {
      return moment.utc(dateTime).format(format)
    }
  }
}
</script>

<style scoped>
.small-width{
  max-width: 8rem;
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
.vs-popup {
  width: auto !important;
}
</style>
