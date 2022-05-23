<!-- =========================================================================================
    File Name: Logout.vue
    Description: Lock Screen Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter justify-center items-center">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/lock-screen.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8 m-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Logout и выход из системы</h4>
                                </div>

                                <div class="flex justify-between flex-wrap w-full mb-6">
                                    <vs-button class="ml-2" color="danger" @click="logout">Выход</vs-button>
                                    <vs-button class="ml-2" @click="returnBack">Отмена</vs-button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {
      if (sessionStorage.getItem('accessToken')) {
        this.$store.dispatch('auth/logoutJWT')
          .then(() => {
            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('refreshToken')
            this.$router.push('/pages/login')
          })
          .catch(() => {
            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('refreshToken')
            this.$router.push('/pages/login')
          })
      }
    },
    returnBack () {
      this.$router.go(-1)
    }
  }
}
</script>
