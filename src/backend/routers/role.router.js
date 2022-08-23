'use strict'

/**
 * 表情
 */
const RoleController = require('../controllers/RoleController');

module.exports = router => {
    router.get("/api/roles" , RoleController.list())
    router.post("/api/role" , RoleController.add())
    router.delete("/api/roles/:id" , RoleController.remove())
    router.get("/api/roles/:id/permissions" , RoleController.permissions())
    router.post("/api/roles/:id/permissions" , RoleController.setPermissions())
}