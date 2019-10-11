const cheerio = require('cheerio')
const https = require('https')
const axios = require('axios')
const request = require('request')
const rp = require('request-promise')
const logger = require('./../utils/log4js').system()
const utils = require('./../utils/utils')
const debug = require('debug')('bili:schedule')
const dateformat = require('dateformat')
const CommonURLConfigure = require('./../constants/CommonURLConfigure')
const userAgents = require('./../lib/UserAgent')
const RequestHandler =require('./../utils/RequestHander')
const {scheduleJob} = require('node-schedule')
const DateUtil = require('./../utils/DateUtil')
const UperService =require('./../services/UperService')
const UperTaskService =require('./../services/UperTaskService')

debug("Uper Schedule ...... ")
scheduleJob('*/10 * * * * *', async () => {
//获取网页
  let now = DateUtil.now()
  let nowTimes = new Date().getTime()
  try{
    let nextTask = await UperTaskService.taskInNext();
    if(!nextTask){
      nextTask = await UperTaskService.nextTask()
    }

    if(!nextTask){
      return debug("Task Is Empty~~~~")
    }

    let {id,bid,name, ctime} = nextTask;

    await UperTaskService.deleteById(id)

    //超过24小时的任务删除
    // if((nowTimes - ctime.getTime()) > 24 * 60 * 60 * 1000){
    //   return;
    // }

    //更新周期小于1个小时的任务也删除
    let existUper = await UperService.findByMid(bid)
    if(existUper &&   (nowTimes - existUper.utime.getTime()) >  60 * 60 * 1000){
      return await UperTaskService.deleteOne({where:{bid: bid}})
    }

    let uperInfo = {}

    //查询资料
    let infoRes = await RequestHandler(CommonURLConfigure.UP_INFO.url.replace("#MID#", bid))
    let info =  utils.parse2Object(infoRes)

    uperInfo.bid = bid;
    if(!info.data){
      return logger.error(`编号: ${bid} infoRes.data empty!`)
    }
    uperInfo.name = info.data.name;
    uperInfo.sign = info.data.sign;
    uperInfo.face = info.data.face;
    uperInfo.level = info.data.level;

    //查询粉丝与关注
    let fansRes = await RequestHandler(CommonURLConfigure.UP_FOLLOW.url.replace("#MID#", bid))
    let fans =  utils.parse2Object(fansRes)

    if(!fans.data){
      return logger.error(`编号: ${bid} fansRes.data empty!`)
    }
    uperInfo.attention = fans.data.following;
    uperInfo.fans = fans.data.follower;

    //查询投稿数
    let contributesRes = await RequestHandler(CommonURLConfigure.CONTRIBUTE_DETAIL.url.replace("#MID#", bid))
    let contributes =  utils.parse2Object(contributesRes)
    uperInfo.contribute = contributes.data.album + contributes.data.audio + contributes.data.article + contributes.data.video


    //查询播放数
    let playRes = await RequestHandler(CommonURLConfigure.PLAY_COUNT.url.replace("#MID#", bid))
    let plays =  utils.parse2Object(playRes)
    uperInfo.play = plays.data.archive.view;

    //查询关注详情
    let followDetail = await RequestHandler(CommonURLConfigure.FOLLOW_DETAIL.url.replace("#MID#", bid))
    let follow =  utils.parse2Object(followDetail)
    let {list} = follow.data
    let followList = list.filter(item=>{
      return item.mid !== bid;
    }).map(item=>{
      return {
        bid: item.mid,
        name: item.uname,
      }
    })

    followList.every(async followItem =>{
      let {bid} =followItem;
      let exist = await UperTaskService.findOne({where: {bid: bid}})
      if(!exist){
        UperTaskService.save(followItem)
      }
    })

    if(existUper){
      uperInfo.utime = new Date();
      debug(`exist and update ${bid}`)
      await UperService.updateOne({bid: bid} , uperInfo);
    }else{
      await UperService.save(uperInfo)
    }
  }catch(err){
    logger.error(err)
    debug(err)
  }
})