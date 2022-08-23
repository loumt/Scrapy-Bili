'use strict'

/**
 * 用户
 */
const UserController = require('../controllers/UserController');

module.exports = router => {
    router.get("/api/users" , UserController.list())
    router.get("/api/users/:id/roles" , UserController.roles())
    router.post("/api/users/:id/roles" , UserController.setRoles())
    router.post("/api/user" , UserController.add())
    router.delete("/api/users/:id" , UserController.remove())
}