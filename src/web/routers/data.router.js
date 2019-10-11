'use strict'

/**
 * Uper路由
 */
const data = require('../controllers/DataController');
const debug = require('debug')('bili:sys')

module.exports = router => {
  router.get("/export" , data.exportExcel())
}