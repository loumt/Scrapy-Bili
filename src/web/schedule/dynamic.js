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
debug("Dynamic Schedule ...... ")
scheduleJob('*/20 * * * * *', async () => {
  try {
    let attention = await AttentionService.nextTask();
    if (!attention) {
      return logger.info('Attention list empty.');
    }

    let {bid} = attention;
    if (!bid || bid === "") {
      return logger.warn('Attention bid is empty. (warn)')
    }
    // bid = 7103073

    logger.info(`正在获取 ${bid} 的动态信息.....`)
    let dynamicResponse = await RequestHandler(CommonURLConfigure.UPER_DYNAMIC_DETAIL.url.replace("#MID#", bid))
    await dynamicResponseHandler(dynamicResponse);

    // logger.info(`正在获取 ${bid} 的视频信息.....`)
    let videoResponse = await RequestHandler(CommonURLConfigure.VIDEO.url.replace("#MID#", bid))
    await videoResponseHandler(videoResponse);

    logger.info(`完成获取 ${bid} 的信息,更新时间变更....`)
    await AttentionService.updateOne({id: attention.id}, {utime: new Date()})
  } catch (err) {
    logger.error(err)
    debug(err)
  }
})


async function dynamicResponseHandler(dynamicResponse) {
  try {
    if (!dynamicResponse || dynamicResponse === "") {
      return logger.warn('Dynamic is empty. (warn)')
    }

    let dynamic = utils.parse2Object(dynamicResponse)

    let {data: dynamicData} = dynamic;
    if (!dynamicData) {
      return logger.error('Attention [data] is not found!')
    }

    let {cards} = dynamicData;
    if (!cards) {
      return logger.error('Attention [cards] is not found!')
    }

    cards.every(await dynamicHandler)
  } catch (err) {
    logger.error(err)
    debug(err)
  }
}

async function videoResponseHandler(videoResponse) {
  if (!videoResponse || videoResponse === "") {
    return logger.warn('Video is empty. (warn)')
  }

  let video = utils.parse2Object(videoResponse)

  let {data: videoData} = video;
  if (!videoData) {
    return logger.error('Video [data] is not found!')
  }
  let {vlist} = videoData;
  if (!vlist || vlist.length === 0) {
    return logger.error('Video [vlist] is not found or empty!')
  }
  vlist.every(await videoHandler)
}

/**
 * 处理动态
 * @param dynamicItem
 */
async function dynamicHandler(dynamicItem) {
  try {
    let {desc, card} = dynamicItem;

    let cardObject = utils.parse2Object(card);

    let did = desc.rid.toString();

    let dynamic = {
      mid: desc.uid,
      did,
      type: desc.type,
      repost: desc.repost,
      like: desc.like,
      ptime: new Date(desc.timestamp * 1000)
    }

    switch (desc.type) {
      case 1:
        dynamic.content = cardObject.item.content
        dynamic.reply = cardObject.item.reply;
        dynamic.title = cardObject.title
        break;
      case 2:
        dynamic.description = cardObject.item.description
        dynamic.reply = cardObject.item.reply;
        dynamic.title = cardObject.title
        break;
      case 4:
        dynamic.content = cardObject.item.content
        dynamic.reply = cardObject.item.reply
        break;
      case 8:
        dynamic.dynamic = cardObject.dynamic
        dynamic.reply = cardObject.stat.reply
        dynamic.title = cardObject.title
        break;
      case 16:
        dynamic.description = cardObject.item.description
        dynamic.reply = cardObject.item.reply
        dynamic.title = cardObject.item.title
        break;
      case 64:
        dynamic.dynamic = cardObject.dynamic
        break;
      case 256:
        dynamic.title = cardObject.title
        dynamic.content = cardObject.intro
        break;
      case 2048:
        dynamic.content = cardObject.vest.content
        dynamic.reply = desc.comment
        break;
      default:
    }

    let existDynamic = await DynamicService.findByDid(did)
    if (existDynamic) {
      dynamic.utime = new Date()
      await DynamicService.updateOne({did}, dynamic)
    } else {
      await DynamicService.save(dynamic)
    }
  } catch (err) {
    logger.error(err)
    debug(err)
  }
}

async function videoHandler(videoItem) {

  let video = {
    mid: videoItem.mid,
    aid: videoItem.aid,
    title: videoItem.title,
    subtitle: videoItem.subtitle,
    comment: videoItem.comment,
    pic: videoItem.pic,
    length: videoItem.length,
    desc: videoItem.description,
    author: videoItem.author,
    ptime: new Date(videoItem.created * 1000)
  }

  let existVideo = await VideoService.findByAid(videoItem.aid);
  if(existVideo){
    await VideoService.updateOne({aid: videoItem.aid}, video)
  }else{
    await VideoService.save(video)
  }
}