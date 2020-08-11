'use strict'

/**
 * 表情
 */
const PermissionController = require('../controllers/PermissionController');

module.exports = router => {
    router.get("/api/permissions" , PermissionController.list())
    router.delete("/api/permissions/:id" , PermissionController.remove())
}