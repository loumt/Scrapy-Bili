import dateFormat from './dateFormat'
import dragDirective from './drag.directive'
const plugin = {
  install: function (Vue) {
    //时间格式化
    Vue.dateFormat = Vue.prototype.dateFormat = dateFormat;
    //拖动指令
    dragDirective(Vue)
  }
}
export default plugin
