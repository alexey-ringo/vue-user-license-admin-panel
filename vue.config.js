/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


module.exports = {
  publicPath: '/',
  transpileDependencies: ['resize-detector'],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   },
  //   proxy: 'http://localhost:3000'
  // }
}

