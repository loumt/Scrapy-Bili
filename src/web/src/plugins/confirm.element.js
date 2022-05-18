/**
 * 对Element UI confirm的封装
 */

function biliConfirm(title ,message , successHandler, errorMsg = "发生错误"){
  this.$confirm(message, title, {
    confirmButtonText: '确定',
    iconClass: 'el-icon-delete-solid',
    cancelButtonText: '不,点错了',
    type: 'info',
    showClose: false
  }).then(successHandler).catch(e => {
    if (e !== 'cancel') {
      this.$message({type: 'info', message: errorMsg});
    }
  });
}

export default biliConfirm;
