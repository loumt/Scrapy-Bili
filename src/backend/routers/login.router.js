'use strict'

/**
 * 用户
 */
const UserController = require('../controllers/UserController');

module.exports = router => {
    router.post("/api/login" , UserController.login())
    router.post("/api/logout" , UserController.logout())
}