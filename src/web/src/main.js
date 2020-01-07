import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-svg-icon/Icon.vue';
import store from './store';
Vue.config.productionTip = false

function dateFormat(row, column, cellValue, index){
  const daterc = row[column.property]

  function formatFunc(str) {    //格式化显示
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(daterc);     //这步是关键
  var year = date2.getFullYear();
  var mon = formatFunc(date2.getMonth() + 1);
  var day = formatFunc(date2.getDate());
  var hour = date2.getHours();
  var seconds = formatFunc(date2.getSeconds());
  hour = formatFunc(hour);
  var min = formatFunc(date2.getMinutes());
  var dateStr = year+'-'+mon+'-'+day +' '+hour+':'+min + ':' + seconds;
  return dateStr;
}



Vue.use(ElementUI)
Vue.component('icon', Icon);
Vue.dateFormat = Vue.prototype.dateFormat = dateFormat;

let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.use({vm})
