// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router/permission.js'
import { router } from './router'
import '@/mock/'
import '@/styles/main.scss';
import store from './store'
import api from '@/api'

Vue.prototype.$api = api; //将api挂载到vue原型上
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
