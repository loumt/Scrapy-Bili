import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/bili-web.css'
import Icon from 'vue-svg-icon/Icon.vue';
import store from './store';
import plugins from './plugins'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(plugins);
Vue.component('icon', Icon);

let vm = new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount("#app")

Vue.use({vm})
