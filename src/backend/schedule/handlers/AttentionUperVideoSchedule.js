const _ = require("lodash")
const utils = require('./../../utils/utils')
const BaseSchedule = require('./BaseSchedule')
const AttentionUperVideoService = require('../../services/AttentionUperVideoService')

class AttentionUperVideoSchedule extends BaseSchedule {
  constructor() {
    super()
  }

  async getNextTask() {
    let videoTask = await AttentionUperVideoService.nextNull()
    if (!videoTask){
      videoTask =   await  AttentionUperVideoService.nextTask();
    }
    return videoTask;
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
      if (err && err.statusCode === 412) return this.logger.error("触发B站风险控制了.")
      this.logger.error("--cartoonTask run---")
      this.logger.error(err)
    }
  }

  async videoResponseHandler(id, videoResponseHandler) {
    if (!videoResponseHandler || videoResponseHandler === "") {
      await AttentionUperVideoService.deleteById(id)
      return this.logger.warn('Video is empty. (warn)')
    }

    let video = utils.parse2Object(videoResponseHandler)

    if (video.code === 62002){
      await AttentionUperVideoService.deleteById(id)
      this.logger.warn(`Video ${id} had been deleted!`);
    }else if(video.code === -404){
      await AttentionUperVideoService.deleteById(id)
      this.logger.warn(`Video ${id} had been deleted!`);
    }else{
      let {data} = video;

      if (!data.stat) {
        await AttentionUperVideoService.deleteById(id)
        return this.logger.warn('Video  [data.stat] is empty. (warn)')
      }

      try {
        await AttentionUperVideoService.updateOne({id}, {
          bvid: data.bvid,
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
      } catch (err) {
        this.logger.error(err)
      }
    }
  }

}

module.exports = new AttentionUperVideoSchedule();