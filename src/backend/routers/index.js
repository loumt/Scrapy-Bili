'use strict'
const path = require('path');
const fs = require('fs');
const AuthMiddle = require('../middleware/ValidationMiddleware')

module.exports = (router) => {
  //用户登录注销
  // require(path.join(__dirname,'page.route'))(router)

  require(path.join(__dirname, 'page.router'))(router)

  //登录验证
  router.use(AuthMiddle);

  //其他接口
  let routers = fs.readdirSync(__dirname).filter((item) => {
    return item.indexOf('user.route') === -1 && item.indexOf('page.route') === -1
      && item.indexOf('index') === -1
  });
  //console.log(routers);
  routers.forEach(routeFile => {
    // console.dir(routeFile);
    if (routeFile.indexOf('route') !== -1) {
      require(path.join(__dirname, routeFile))(router)
    }
  })
}