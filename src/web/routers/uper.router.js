'use strict'

/**
 * Uper路由
 */
const UperController = require('../controllers/UperController');

module.exports = router => {
  router.get("/api/upers", UperController.list())
  router.get("/api/upers/:bid", UperController.find())
}