'use strict'

/**
 * 表情
 */
const RoleController = require('../controllers/RoleController');

module.exports = router => {
    router.get("/api/roles" , RoleController.list())
    router.delete("/api/roles/:id" , RoleController.remove())
}