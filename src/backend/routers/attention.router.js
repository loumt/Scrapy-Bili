'use strict'

/**
 * Attention路由
 */
const AttentionUperController = require('../controllers/AttentionUperController');
const VideoController = require('../controllers/VideoController');
const AttentionCartoonController = require('../controllers/AttentionCartoonController');
const DynamicController = require('../controllers/DynamicController');

module.exports = router => {
  router.get("/api/attention/upers", AttentionUperController.getAttentionList())
  router.post("/api/attention/upers", AttentionUperController.addAttention())
  router.delete("/api/attention/upers/:id", AttentionUperController.deleteAttention())

  router.get("/api/attention/upers/:id/dynamics" , DynamicController.getDynamicList())
  router.get("/api/attention/upers/:id/videos" , VideoController.getVideoList())

  router.get("/api/attention/cartoons", AttentionCartoonController.getAttentionCartoonList())
  router.delete("/api/attention/cartoons/:id", AttentionCartoonController.removeAttentionCartoon())
  router.post("/api/attention/cartoons", AttentionCartoonController.addAttentionCartoon())
}