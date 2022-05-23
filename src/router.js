/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/users'
        },
        // =============================================================================
        // Prolift Admin Panel
        // =============================================================================
        {
          path: '/users',
          name: 'user-list',
          component: () => import('@/views/user/Users.vue'),
          meta: {
            breadcrumb: [
              { title: 'Домой', url: '/' },
              { title: 'Пользователи', url: '/'},
              { title: 'Все', active: true }
            ],
            pageTitle: 'Все пользователи',
            rule: 'editor'
          }
        },
        {
          path: '/user/create',
          name: 'user-create',
          component: () => import('@/views/user/user-create/UserCreate.vue'),
          meta: {
            breadcrumb: [
              { title: 'Домой', url: '/' },
              { title: 'Пользователи', url: '/' },
              { title: 'Новый пользователь', active: true }
            ],
            pageTitle: 'Создание пользователя',
            rule: 'editor'
          }
        },
        {
          path: '/user/:userId',
          name: 'user-edit',
          component: () => import('@/views/user/user-edit/UserEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Домой', url: '/' },
              { title: 'Пользователи', url: '/' },
              { title: 'Редактирование', active: true }
            ],
            pageTitle: 'Редактирование пользователя',
            rule: 'editor'
          }
        },
        {
          path: '/user/:userId/license/create',
          name: 'license-create-for-user',
          component: () => import('@/views/user/user-edit/LicenseCreateForUser.vue'),
          meta: {
            breadcrumb: [
              { title: 'Домой', url: '/' },
              { title: 'Пользователи', url: '/' },
              { title: 'Новая лицензия', active: true }
            ],
            pageTitle: 'Создание лицензии',
            rule: 'editor'
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================

        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('@/views/pages/logout/Logout.vue'),
          meta: {
            pageTitle: '',
            rule: 'editor'
          }
        },
        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

// router.beforeEach((to, from, next) => {
//   // if (
//   //     to.path === "/pages/login" ||
//   //     to.path === "/pages/forgot-password" ||
//   //     to.path === "/pages/error-404" ||
//   //     to.path === "/pages/error-500" ||
//   //     to.path === "/pages/register" ||
//   //     to.path === "/callback" ||
//   //     to.path === "/pages/comingsoon" ||
//   //     (auth.isAuthenticated() || firebaseCurrentUser)
//   // ) {
//   //     return next();
//   // }
//
//   // If auth required, check login. If login fails redirect to login page
//   if (to.meta.authRequired) {
//     // localStorage.getItem('accessToken') <= will check for JWT login which stores acessToken in localStorage
//     // NOTE: You might want to change checking logged in user. We are just checking it by existence of accessToken but you might prefer more reliable
//     //       and suitable approach to your app
//     //------------------------------------------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     if (!(localStorage.getItem('accessToken'))) {
//       router.push({
//         path: '/pages/login',
//         query: {to: to.path}
//       })
//     }
//   }
//
//   return next()
//   // Specify the current path as the customState parameter, meaning it
//   // will be returned to the application after auth
//   // auth.login({ target: to.path });
//
//
// })


// router.beforeEach((to, from, next) => {
//   // console.log('I am into router.beforeEach')
//
//   store.dispatch('auth/initTokenFromStorage')
//
//   const token = store.getters['auth/accessToken']
//
//   if (!token && to.name != 'page-login') {
//     return next({ path: 'pages/login' })
//   } else if (token && to.name === 'page-login') {
//     next({ path: 'article-types' })
//   } else {
//     next()
//   }
// })
//
// router.beforeEach((to, from, next) => {
//   const token = store.getters.admin.authToken
//   if (!token && to.name != 'login') {
//     next('/login')
//   } else if (token && to.name === 'login') {
//     next('/dashboard')
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken && to.name !== 'page-login') {
    return next({ path: 'pages/login' })
  } else if (accessToken && to.name === 'page-login') {
    next({ path: 'user-list' })
  } else {
    next()
  }
})

export default router
