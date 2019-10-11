const cheerio = require('cheerio')
const https = require('https')
const axios = require('axios')
const request = require('request')
const rp = require('request-promise')
const utils = require('./../utils/utils')
const debug = require('debug')('bili:schedule')
const dateformat = require('dateformat')
const CommonURLConfigure = require('./../constants/CommonURLConfigure')
const userAgents = require('./../lib/UserAgent')
const RequestHandler = require('./../utils/RequestHander')
const {scheduleJob} = require('node-schedule')
const DateUtil = require('./../utils/DateUtil')
const UperService = require('./../services/UperService')
const DynamicService = require('./../services/DynamicService')
const VideoService = require('./../services/VideoService')
const AttentionService = require('./../services/AttentionService')
const logger = require('./../utils/log4js').schedule()

/**
 * 动态与视频
 **/
debug("Video Schedule ...... ")
scheduleJob('*/6 * * * * *', async () => {
  try {
    let nextVideo = await VideoService.nextTask();
    if (!nextVideo) {
      return logger.info('Video list empty.');
    }

    let {aid, id} = nextVideo;
    if (!aid || aid === "") {
      await VideoService.deleteById(id)
      return logger.warn('Video aid is empty. (warn)')
    }

    let videoResponse = await RequestHandler(CommonURLConfigure.VIDEO_DETAIL.url.replace("#AID#", aid))
    await videoResponseHandler(id, videoResponse)

  } catch (err) {
    logger.error(err)
    debug(err)
  }
})

async function videoResponseHandler(id, videoResponseHandler) {

  if (!videoResponseHandler || videoResponseHandler === "") {
    await VideoService.deleteById(id)
    return logger.warn('Video is empty. (warn)')
  }

  let video = utils.parse2Object(videoResponseHandler)

  let {data} = video;
  if(!data.stat){
    await VideoService.deleteById(id)
    return logger.warn('Video  [data.stat] is empty. (warn)')
  }

  try{
    await VideoService.updateOne({id}, {
      utime: new Date(),
      coin: data.stat.coin,
      share: data.stat.share,
      like: data.stat.like,
      favorite: data.stat.favorite,
      danmaku: data.stat.danmaku,
      view: data.stat.view,
      comment: data.stat.reply,
      duration: data.duration
    })
  }catch(err){
    logger.error(err)
  }

}