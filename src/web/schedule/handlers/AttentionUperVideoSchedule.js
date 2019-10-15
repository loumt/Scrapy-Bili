

const _ = require("lodash")
const utils = require('./../../utils/utils')
const BaseSchedule = require('./BaseSchedule')
const AttentionUperVideoService = require('../../services/AttentionUperVideoService')

class AttentionUperVideoSchedule extends BaseSchedule {
  constructor() {
    super()
  }

  async getNextTask(){
    return  await  AttentionUperVideoService.nextTask();
  }

  async run() {
    try {
      //获取任务
      console.log('Attention Uper Video Task ..... ' + new Date())
      let nextVideo = await this.getNextTask();
      if (!nextVideo) return this.logger.info('Video list empty.');

      let {aid, id} = nextVideo;
      if (!aid || aid === "") {
        await AttentionUperVideoService.deleteById(id)
        return this.logger.warn('Video aid is empty. (warn)')
      }

      let videoResponse = await this.RequestHandler(this.CommonURLConfigure.VIDEO_DETAIL.url.replace("#AID#", aid))
      await this.videoResponseHandler(id, videoResponse)
    } catch (err) {
      this.logger.error("--cartoonTask run---")
      this.logger.error(err)
    }
  }

  async videoResponseHandler(id, videoResponseHandler) {

    if (!videoResponseHandler || videoResponseHandler === "") {
      await AttentionUperVideoService.deleteById(id)
      return logger.warn('Video is empty. (warn)')
    }

    let video = utils.parse2Object(videoResponseHandler)

    let {data} = video;
    if(!data.stat){
      await AttentionUperVideoService.deleteById(id)
      return this.logger.warn('Video  [data.stat] is empty. (warn)')
    }

    try{
      await AttentionUperVideoService.updateOne({id}, {
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
      this.logger.error(err)
    }

  }

}

module.exports = new AttentionUperVideoSchedule();