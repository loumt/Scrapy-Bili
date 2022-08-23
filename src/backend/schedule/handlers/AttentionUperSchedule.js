const _ = require("lodash")
const utils = require('./../../utils/utils')
const BaseSchedule = require('./BaseSchedule')
const MessageType = require("./../../constants/MessageType")
const AttentionUperService = require('../../services/AttentionUperService')
const UperService = require('../../services/UperService')
const SystemMessageService = require("./../../services/SystemMessageService")

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

            let nowTimes = new Date().getTime()
            if(nowTimes - utime.getTime() >  60 * 1000) return;

            let uperInfo = {}

            //查询资料
            let infoRes = await this.RequestHandler(this.CommonURLConfigure.UP_INFO.url.replace("#MID#", bid))
            let info = utils.parse2Object(infoRes)

            if (!info || info.code !== 0) return this.logger.error("查询用户失败");

            uperInfo.sex = 0;
            uperInfo.name = info.data.name;
            uperInfo.sign = info.data.sign;
            uperInfo.face = info.data.face;
            uperInfo.level = info.data.level;

            //补充性别
            if (info.data.sex === '男') uperInfo.sex = 1;
            if (info.data.sex === '女') uperInfo.sex = 2;

            //查询粉丝与关注
            let fansRes = await this.RequestHandler(this.CommonURLConfigure.UP_FOLLOW.url.replace("#MID#", bid))
            let fans = utils.parse2Object(fansRes)

            if (!fans.data) return this.logger.error(`编号: ${bid} fansRes.data empty!`)

            uperInfo.attention = fans.data.following;
            uperInfo.fans = fans.data.follower;

            //查询投稿数
            let contributesRes = await this.RequestHandler(this.CommonURLConfigure.CONTRIBUTE_DETAIL.url.replace("#MID#", bid))
            let contributes = utils.parse2Object(contributesRes)
            uperInfo.contribute = contributes.data.album + contributes.data.audio + contributes.data.article + contributes.data.video


            //查询播放数
            let playCountURL = this.CommonURLConfigure.PLAY_COUNT.url.replace("#MID#", bid);
            let playRes = await this.RequestHandler(playCountURL)
            let plays = utils.parse2Object(playRes)

            if (_.isEmpty(plays.data)) {
                //请求失效，请检查
                this.logger.error("AttentionUper : " + bid + " # PLAY_COUNT # " + playRes + " # Data is empty ! ")
                //保存为信息
                await SystemMessageService.save({
                    bid: bid,
                    type: MessageType.SCHEDULE_MESSAGE,
                    title: "data is empty",
                    message: "AttentionUperSchedule#PLAY_COUNT " + playRes,
                    remark: playCountURL
                })

                uperInfo.play = 0;
            } else {
                uperInfo.play = plays.data.archive.view;
            }

            uperInfo.utime = new Date();
            await UperService.updateOne({bid: bid}, uperInfo);
        } catch (err) {
            console.log(err)
            if (err && err.statusCode === 412) return this.logger.error("触发B站风险控制了.")
            this.logger.error("--Attention Uper Handler---")
            this.logger.error(err)

        }
    }
}

module.exports = new AttentionUperSchedule();