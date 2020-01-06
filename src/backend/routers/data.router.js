'use strict'

/**
 * 导出,查询,其他路由
 */
const ExportDataController = require('../controllers/ExportDataController');
const AttentionCartoonController = require('../controllers/AttentionCartoonController');
const UperController = require('../controllers/UperController');
const HistoryController = require('../controllers/HistoryController');
const NavigationController = require('../controllers/NavigationController');

module.exports = router => {
  router.get("/api/search/cartoon/:cartoonId", AttentionCartoonController.findCartoonRemote())
  router.get("/api/search/uper/:bid", UperController.findUper())
  router.get("/api/search/history/:type", HistoryController.list())
  router.get("/api/export" , ExportDataController.exportExcel())
  router.get("/api/navigation",NavigationController.info() )
  router.get("/api/limit" , NavigationController.getRequestCount())
}