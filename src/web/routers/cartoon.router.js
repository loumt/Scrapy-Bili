'use strict'

/**
 * Cartoon路由
 */
const cartoons = require('../controllers/CartoonController');
const debug = require('debug')('bili:sys')

module.exports = router => {
  router.get("/cartoon/:cartoonId", cartoons.findCartoonRemote())

  router.get("/cartoons", cartoons.getCartoonList())
  router.delete("/cartoons/:id", cartoons.removeCartoon())
  router.post("/cartoons", cartoons.saveAttentionCartoon())
}