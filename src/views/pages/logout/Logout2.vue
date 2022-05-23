<template>
  <div>
    <vs-popup classContent="popup-logout" :background-color="backgroundPopupColor" title="Выход из панели Администратора" :active.sync="popupActive">
      <div class="vx-row">
        <vs-button @click="logout" color="danger" class="mr-6" type="filled">Выйти</vs-button>
        <vs-button @click="popupActive = false" color="primary" type="filled">Отмена</vs-button>
      </div>
    </vs-popup>
  </div>

</template>

<script>
export default {
  data () {
    return {
      backgroundPopupColor: '#21A4B7',
      popupActive: false
    }
  },
  watch: {
    popupActive (newVal, oldVal) {
      if (newVal !== oldVal && newVal === false) {
        this.$router.go(-1)
      }
    },
  },
  methods: {
    confirmLogout () {
      this.popupActive = true
    },
    logout () {
      if (sessionStorage.getItem('accessToken')) {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
        this.$router.push('/pages/login').catch(() => {})
      }
      // Change role on logout. Same value as initialRole of acj.js
      // this.$acl.change('admin')

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {})
    }
  },
  mounted () {
    this.confirmLogout()
  },
  beforeRouteLeave (to, from, next) {
    this.popupActive = false
    setTimeout(() => {
      next()
    }, 500)
  }
}
</script>

<style scoped>
.popup-logout {
  width: auto;
}

</style>