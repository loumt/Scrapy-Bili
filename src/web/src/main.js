import Vue from 'vue'
import axios from 'axios';
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-svg-icon/Icon.vue';
import store from './store';
Vue.config.productionTip = false

let instance = axios.create({
  timeout: 2000,
})

Vue.use(ElementUI)
Vue.component('icon', Icon);
Vue.$http = Vue.prototype.$http = instance;

let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.use({vm})
