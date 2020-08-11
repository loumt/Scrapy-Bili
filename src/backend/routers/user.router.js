'use strict'

/**
 * 用户
 */
const UserController = require('../controllers/UserController');

module.exports = router => {
    router.get("/api/users" , UserController.list())
    router.delete("/api/users/:id" , UserController.remove())
}