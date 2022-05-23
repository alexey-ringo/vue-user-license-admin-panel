<template>
  <div class="the-navbar__user-meta flex items-center">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ authUser.full_name }}</p>
      <small>{{authUser.email}}</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img key="onlineImg" src="@/assets/images/portrait/small/avatar-s-11.jpg" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

<!--          <li-->
<!--            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
<!--            @click="$router.push('/pages/profile').catch(() => {})">-->
<!--            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />-->
<!--            <span class="ml-2">Profile</span>-->
<!--          </li>-->

<!--          <li-->
<!--            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
<!--            @click="$router.push('/old_apps/email').catch(() => {})">-->
<!--            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />-->
<!--            <span class="ml-2">Inbox</span>-->
<!--          </li>-->

<!--          <li-->
<!--            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
<!--            @click="$router.push('/old_apps/todo').catch(() => {})">-->
<!--            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />-->
<!--            <span class="ml-2">Tasks</span>-->
<!--          </li>-->

<!--          <li-->
<!--            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
<!--            @click="$router.push('/old_apps/chat').catch(() => {})">-->
<!--            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />-->
<!--            <span class="ml-2">Chat</span>-->
<!--          </li>-->

<!--          <li-->
<!--            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
<!--            @click="$router.push('/old_apps/eCommerce/wish-list').catch(() => {})">-->
<!--            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />-->
<!--            <span class="ml-2">Wish List</span>-->
<!--          </li>-->

<!--          <vs-divider class="m-1" />-->

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // this.$store.dispatch('fetchAuthUser')
  },
  computed: {
    authUser () {
      return this.$store.getters['getAuthUser']
    }
  },
  methods: {
    logout () {

      // if user is logged in via auth0
      // if (this.$auth.profile) this.$auth.logOut()


      // If JWT login
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
  }
}
</script>
