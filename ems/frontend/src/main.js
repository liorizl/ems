// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from "axios"
import vueCookies from 'vue-cookies';
import "./assets/less/index.less";
Vue.use(vueCookies)
Vue.config.productionTip = false
Vue.prototype.axios = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
