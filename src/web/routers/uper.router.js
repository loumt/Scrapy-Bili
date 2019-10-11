'use strict'

/**
 * Uper路由
 */
const uper = require('../controllers/UperController');
const debug = require('debug')('bili:sys')

module.exports = router => {
  router.get("/upers", uper.getUperList())
  router.get("/upers/:bid", uper.getUper())
  router.get("/uper/:bid", uper.findUper())
  router.post("/uper", uper.addAttention())
}