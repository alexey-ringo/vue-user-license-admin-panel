/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    header: 'Prolift',
    icon: 'PackageIcon',
    i18n: 'Prolift',
    items: [
      {
        url: '/users',
        name: 'Пользователи',
        icon: 'UserIcon',
        i18n: 'Пользователи'
      },
      {
        url: '/logout',
        name: 'Logout',
        icon: 'LogOutIcon',
        i18n: 'Logout',
        // submenu: [
        //   {
        //     url: '/logout',
        //     name: 'Exit',
        //     slug: 'exit',
        //     i18n: 'Выход'
        //   }
        // ]
      },
    ]
  }
]

