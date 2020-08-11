'use strict'
const path = require('path');
const fs = require('fs');
const AuthMiddle = require('../middleware/ValidationMiddleware')

module.exports = (router) => {
  //用户登录注销
  require(path.join(__dirname,'login.router'))(router)

  // require(path.join(__dirname, 'page.router'))(router)

  //登录验证
  router.use(AuthMiddle);

  //其他接口
  let routers = fs.readdirSync(__dirname).filter((item) => {
    return item.indexOf('login.router') === -1
        && item.indexOf('page.router') === -1
      && item.indexOf('index') === -1
  });
  //console.log(routers);
  routers.forEach(routeFile => {
    // console.dir(routeFile);
    if (routeFile.indexOf('router') !== -1) {
      require(path.join(__dirname, routeFile))(router)
    }
  })
}