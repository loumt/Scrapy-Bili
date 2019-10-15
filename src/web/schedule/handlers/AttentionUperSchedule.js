const _ = require("lodash")
const utils = require('./../../utils/utils')
const BaseSchedule = require('./BaseSchedule')
const AttentionUperService = require('../../services/AttentionUperService')
const UperService = require('../../services/UperService')

class AttentionUperSchedule extends BaseSchedule {
  constructor() {
    super()
  }

  async getNextTask() {
    return await  AttentionUperService.nextTask();
  }

  async run() {
    try {
        console.log('Attention Uper Task ..... ' + new Date())
        let attentionUper = await this.getNextTask();
        if (!attentionUper) return;


        let {id, bid, utime, ctime} = attentionUper;

        let existUper = await UperService.findByMid(bid)
        if(!existUper) return this.logger.error(`Attention Uper ${bid} is not exist! `)

        let uperInfo = {}

        //查询资料
        let infoRes = await this.RequestHandler(this.CommonURLConfigure.UP_INFO.url.replace("#MID#", bid))
        let info = utils.parse2Object(infoRes)

        uperInfo.name = info.data.name;
        uperInfo.sign = info.data.sign;
        uperInfo.face = info.data.face;
        uperInfo.level = info.data.level;

        //查询粉丝与关注
        let fansRes = await this.RequestHandler(this.CommonURLConfigure.UP_FOLLOW.url.replace("#MID#", bid))
        let fans = utils.parse2Object(fansRes)

        if (!fans.data)
          return this.logger.error(`编号: ${bid} fansRes.data empty!`)

        uperInfo.attention = fans.data.following;
        uperInfo.fans = fans.data.follower;

        //查询投稿数
        let contributesRes = await this.RequestHandler(this.CommonURLConfigure.CONTRIBUTE_DETAIL.url.replace("#MID#", bid))
        let contributes = utils.parse2Object(contributesRes)
        uperInfo.contribute = contributes.data.album + contributes.data.audio + contributes.data.article + contributes.data.video


        //查询播放数
        let playRes = await this.RequestHandler(this.CommonURLConfigure.PLAY_COUNT.url.replace("#MID#", bid))
        let plays = utils.parse2Object(playRes)
        uperInfo.play = plays.data.archive.view;

        await UperService.updateOne({bid: bid}, uperInfo);
      } catch (err) {
        this.logger.error("--Attention Uper Handler---")
        this.logger.error(err)
      }
    }
}

module.exports = new AttentionUperSchedule();