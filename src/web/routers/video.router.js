'use strict'

/**
 * Video路由
 */
const video = require('../controllers/VideoController');
const debug = require('debug')('bili:sys')

module.exports = router => {
  router.get("/video/:uperId" , video.getVideoList())
}