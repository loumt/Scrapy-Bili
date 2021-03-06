const _ = require("lodash")
const utils = require('./../../utils/utils')
const BaseSchedule = require('./BaseSchedule')
const AttentionCartoonService = require('../../services/AttentionCartoonService')

class AttentionCartoonSchedule extends BaseSchedule {
  constructor() {
    super()
  }

  async getNextTask(){
    return  await  AttentionCartoonService.nextTask();
  }

  async run() {
    try {
      //获取任务
      // console.log('Attention Cartoon Task ..... ' + new Date())
      let cartoon = await this.getNextTask();
      if (!cartoon || !cartoon.mid) return;

      let cartoonResponse = await this.RequestHandler(this.CommonURLConfigure.CARTOON_DETAIL.url.replace("#MID#", cartoon.mid))
      await this.cartoonResponseHandler(cartoon.id, cartoonResponse)
    } catch (err) {
      this.logger.error("--cartoonTask run---")
      this.logger.error(err)
    }
  }

  async cartoonResponseHandler(id, cartoonResponse) {
    try {
      if (_.isEmpty(cartoonResponse)) {
        await AttentionCartoonService.updateOne({id}, {cancel: AttentionCartoonService.CANCEL.YES, utime: new Date()})
        return this.logger.warn(`Cant find cartoon . or maybe sold out!  (warn)`)
      }

      let cartoon = utils.parse2Object(cartoonResponse)

      //番剧下架
      if(cartoon.code && cartoon.code === -404) {
        let attentionCartoon = await AttentionCartoonService.findByPk(id);
        await AttentionCartoonService.deleteById(id)
        this.logger.warn(`Cartoon ${id} ${attentionCartoon.name} had been deleted!`);
      }else{
        let data = {
          fans: cartoon.result.stat.favorites,
          utime: new Date()
        }

        if (cartoon.result.rating) {
          data.ratingCount = cartoon.result.rating.count
          data.ratingCode = cartoon.result.rating.score
        }
        await AttentionCartoonService.updateOne({id}, data)
      }

    } catch (err) {
      if(err && err.statusCode === 412) return this.logger.error("触发B站风险控制了.")
      this.logger.error("--cartoonResponseHandler---")
      this.logger.error(err)
    }
  }

}

module.exports = new AttentionCartoonSchedule();