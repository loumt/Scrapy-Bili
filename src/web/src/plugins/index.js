import dateFormat from './dateFormat'
import emijiUtil from './emijiUtil'
import dragDirective from './drag.directive'
import confirm from './confirm.element'



const plugin = {
  install: function (Vue) {
    //时间格式化
    Vue.dateFormat = Vue.prototype.dateFormat = dateFormat;
    //表情替换
    Vue.emijiUtil = Vue.prototype.emijiUtil = emijiUtil.transFormEmoji;
    //拖动指令
    dragDirective(Vue)

    Vue.dateFormat = Vue.prototype.biliConfirm = confirm;
  }
}
export default plugin
