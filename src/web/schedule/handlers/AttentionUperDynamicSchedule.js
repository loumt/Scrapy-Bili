const _ = require("lodash")
const utils = require('./../../utils/utils')
const BaseSchedule = require('./BaseSchedule')
const AttentionUperService = require('../../services/AttentionUperService')
const AttentionUperDynamicService = require('../../services/AttentionUperDynamicService')
const AttentionUperVideoService = require('../../services/AttentionUperVideoService')

/**
 * 关注的Up主动态(包括文字动态与视频动态)
 */
class AttentionUperDynamicSchedule extends BaseSchedule {
  constructor() {
    super()
  }

  async getNextTask() {
    return await AttentionUperService.nextTask();
  }

  async run() {
    try {
      //获取任务
      // console.log('Attention Uper Dynamic Task ..... ' + new Date())
      let attention = await this.getNextTask();
      if (!attention || !attention.bid) return;

      let {bid} = attention;
      if (!bid || bid === "") return this.logger.warn('Attention bid is empty. (warn)')

      // bid = 7103073

      this.logger.info(`正在获取 ${bid} 的动态信息.....`)
      let dynamicResponse = await this.RequestHandler(this.CommonURLConfigure.UPER_DYNAMIC_DETAIL.url.replace("#MID#", bid))
      await this.dynamicResponseHandler(dynamicResponse);

      // logger.info(`正在获取 ${bid} 的视频信息.....`)
      let videoResponse = await this.RequestHandler(this.CommonURLConfigure.VIDEO.url.replace("#MID#", bid))
      await this.videoResponseHandler(videoResponse);

      this.logger.info(`完成获取 ${bid} 的信息,更新时间变更....`)
      await AttentionUperService.updateOne({id: attention.id}, {utime: new Date()})
    } catch (err) {
      this.logger.error("--cartoonTask run---")
      this.logger.error(err)
    }
  }

  async dynamicResponseHandler(dynamicResponse) {
    try {
      if (!dynamicResponse || dynamicResponse === "")
        return this.logger.warn('Dynamic is empty. (warn)')

      let dynamic = utils.parse2Object(dynamicResponse)

      let {data: dynamicData} = dynamic;
      if (!dynamicData)
        return this.logger.error('Attention [data] is not found!')


      let {cards} = dynamicData;
      if (!cards)
        return this.logger.error('Attention [cards] is not found!')

      cards.every(await this.dynamicHandler)
    } catch (err) {
      this.logger.error("--cartoonResponseHandler---")
      this.logger.error(err)
    }
  }


  async dynamicHandler(dynamicItem) {
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

      let existDynamic = await AttentionUperDynamicService.findByDid(did)
      if (existDynamic) {
        dynamic.utime = new Date()
        await AttentionUperDynamicService.updateOne({did}, dynamic)
      } else {
        await AttentionUperDynamicService.save(dynamic)
      }
    } catch (err) {
      this.logger.error(err)
    }
  }

  async videoResponseHandler(videoResponse) {
    if (!videoResponse || videoResponse === "")
      return this.logger.warn('Video is empty. (warn)')

    let video = utils.parse2Object(videoResponse)

    let {data: videoData} = video;
    if (!videoData) return this.logger.error('Video [data] is not found!')
    let {vlist} = videoData;
    if (!vlist || vlist.length === 0) return this.logger.error('Video [vlist] is not found or empty!')

    vlist.every(await this.videoHandler)
  }

  async videoHandler(videoItem) {
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

    let existVideo = await AttentionUperVideoService.findByAid(videoItem.aid);
    if(existVideo){
      await AttentionUperVideoService.updateOne({aid: videoItem.aid}, video)
    }else{
      await AttentionUperVideoService.save(video)
    }
  }
}

module.exports = new AttentionUperDynamicSchedule();