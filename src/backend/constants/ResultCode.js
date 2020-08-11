module.exports = {
  LOGIN_FAIL:{
    success:false,
    code:304,
    message:'登录失败'
  },
  ILLEGAL_VALUE:{
    success:false,
    code:306,
    message:'非法字符'
  },
  LOGIN_FAIL_WITH_PWD:{
    success:false,
    code:307,
    message:'密码错误'
  },
  LOGIN_FAIL_WITH_USER_NOT_EXIST:{
    success:false,
    code:308,
    message:'用户不存在'
  },
  GET_DATA_ERROR:{
    success:false,
    code:310,
    message:'数据获取失败'
  },
  MUST_LOGIN:{
    success:false,
    code:401,
    message:'请重新登录'
  },
  SUCCESS:{
    success:true,
    code:400,
    message:'成功'
  },
  SYSTEM_ERROR:{
    success:false,
    code:500,
    message:'服务器错误'
  },
  ERROR_ORIGIN_SOURCE:{
    success:false,
    code:600,
    message:'恶意访问源'
  },
  ALREADY_ATTENTION: {
    success:false,
    code: 700,
    message: '已关注'
  },
  NOT_FOUND:{
    success:false,
    code: 701,
    message: '未找到数据'
  },
  USER_CANT_DELETED:{
    success:false,
    code: 702,
    message: '用户不可删除'
  }
}