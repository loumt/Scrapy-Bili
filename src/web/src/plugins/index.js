import dateFormat from './dateFormat'
const plugin = {
  install: function (Vue) {
    //时间格式化
    Vue.dateFormat = Vue.prototype.dateFormat = dateFormat;







  }
}
export default plugin
