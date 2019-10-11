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
  }
}