'use strict'

/**
 * Dynamic路由
 */
const dynamic = require('../controllers/DynamicController');
const debug = require('debug')('bili:sys')

module.exports = router => {
  router.get("/dynamic/:uperId" , dynamic.getDynamicList())
}