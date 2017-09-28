// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
/*引入路由设置*/
import router from './router'
import VueResource from 'vue-resource'

/*基本css*/
import "@/assets/reusable.css"
import "@/assets/animate.css"

/*引入路由设置*/
import "vue-resource"

import utils from './utils'
window.utils = utils

import 'babel-polyfill' 

/*使用VueResource插件*/
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
