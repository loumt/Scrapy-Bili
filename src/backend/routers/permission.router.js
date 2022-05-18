'use strict'

/**
 * 表情
 */
const PermissionController = require('../controllers/PermissionController');

module.exports = router => {
    router.get("/api/permissions" , PermissionController.list())
    router.post("/api/permission" , PermissionController.add())
    router.put("/api/permission/:id" , PermissionController.update())
    router.delete("/api/permissions/:id" , PermissionController.remove())
}