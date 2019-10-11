'use strict'

/**
 * Attention路由
 */
const attention = require('../controllers/AttentionController');
const debug = require('debug')('bili:sys')

module.exports = router => {
  router.get("/attentions", attention.getAttentionList())
  router.post("/attentions", attention.addAttention())
  router.delete("/attentions/:id", attention.deleteAttention())
}