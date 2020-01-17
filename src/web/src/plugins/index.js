import dateFormat from './dateFormat'
import emijiUtil from './emijiUtil'
import dragDirective from './drag.directive'
const plugin = {
  install: function (Vue) {
    //时间格式化
    Vue.dateFormat = Vue.prototype.dateFormat = dateFormat;
    //表情替换
    Vue.emijiUtil = Vue.prototype.emijiUtil = emijiUtil;
    //拖动指令
    dragDirective(Vue)
  }
}
export default plugin
