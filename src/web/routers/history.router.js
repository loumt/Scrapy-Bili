'use strict'

/**
 * 历史路由
 */
const HistoryController = require('../controllers/HistoryController');
const debug = require('debug')('bili:sys')

module.exports = router => {
  router.get("/search/history/:type", HistoryController.list())
}