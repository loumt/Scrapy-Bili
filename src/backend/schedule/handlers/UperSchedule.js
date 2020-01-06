const _ = require("lodash")
const utils = require('./../../utils/utils')
const BaseSchedule = require('./BaseSchedule')
const UperTaskService = require('../../services/UperTaskService')
const UperService = require('../../services/UperService')
const AttentionUperVideoService = require('../../services/AttentionUperVideoService')

class UperSchedule extends BaseSchedule {
  constructor(){
    super();
  }

  async getNextTask(){
    return await UperTaskService.nextTask()
  }

  async run(){
    try{
      // console.log('Uper Task ..... ' + new Date())
      let task = await this.getNextTask();
      if(!task) return;

      let {id,bid,name, ctime} = task;

      //任务拿到即删除
      await UperTaskService.deleteById(id)

      let existUper = await UperService.findByMid(bid)
      let nowTimes = new Date().getTime()
      if(existUper &&   (nowTimes - existUper.utime.getTime()) >  60 * 60 * 1000)
        return await UperTaskService.deleteOne({bid: bid})

      let uperInfo = {}

      //查询资料
      let infoRes = await this.RequestHandler(this.CommonURLConfigure.UP_INFO.url.replace("#MID#", bid))
      let info =  utils.parse2Object(infoRes)

      uperInfo.bid = bid;
      if(!info.data)
        return this.logger.error(`编号: ${bid} infoRes.data empty!`)

      uperInfo.name = info.data.name;
      uperInfo.sign = info.data.sign;
      uperInfo.face = info.data.face;
      uperInfo.level = info.data.level;

      //查询粉丝与关注
      let fansRes = await this.RequestHandler(this.CommonURLConfigure.UP_FOLLOW.url.replace("#MID#", bid))
      let fans =  utils.parse2Object(fansRes)

      if(!fans.data)
        return this.logger.error(`编号: ${bid} fansRes.data empty!`)

      uperInfo.attention = fans.data.following;
      uperInfo.fans = fans.data.follower;

      //查询投稿数
      let contributesRes = await this.RequestHandler(this.CommonURLConfigure.CONTRIBUTE_DETAIL.url.replace("#MID#", bid))
      let contributes =  utils.parse2Object(contributesRes)
      uperInfo.contribute = contributes.data.album + contributes.data.audio + contributes.data.article + contributes.data.video


      //查询播放数
      let playRes = await this.RequestHandler(this.CommonURLConfigure.PLAY_COUNT.url.replace("#MID#", bid))
      let plays =  utils.parse2Object(playRes)
      uperInfo.play = plays.data.archive.view;

      //查询关注详情
      // let followDetail = await this.RequestHandler(this.CommonURLConfigure.FOLLOW_DETAIL.url.replace("#MID#", bid))
      // let follow =  utils.parse2Object(followDetail)
      // let {list} = follow.data
      // let followList = list.filter(item=>{
      //   return item.mid !== bid;
      // }).map(item=>{
      //   return {
      //     bid: item.mid,
      //     name: item.uname,
      //   }
      // })
      //
      // followList.every(async followItem =>{
      //   let {bid} =followItem;
      //   let exist = await UperTaskService.findOne({where: {bid: bid}})
      //   if(!exist){
      //     UperTaskService.save(followItem)
      //   }
      // })

      if(existUper){
        uperInfo.utime = new Date();
        await UperService.updateOne({bid: bid} , uperInfo);
      }else{
        await UperService.save(uperInfo)
      }
    }catch(err){
      if(err && err.statusCode === 412) return this.logger.error("触发B站风险控制了.")
      this.logger.error("--uperTask run---")
      this.logger.error(err)
    }
  }

}

module.exports = new UperSchedule();