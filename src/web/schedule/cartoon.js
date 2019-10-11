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
const CartoonService =require('./../services/CartoonService')

debug("CarToon Schedule ...... ")
scheduleJob('0 */3 * * * *', async () => {
//获取网页
  let now = DateUtil.now()
  debug(now)

  let nowTimes = new Date().getTime()

  try{
    let cartoon = await CartoonService.nextTask();

    let cartoonResponse = await RequestHandler(CommonURLConfigure.CARTOON_DETAIL.url.replace("#MID#", cartoon.mid))
    await cartoonResponseHandler(cartoon.id, cartoonResponse)

  }catch(err){
    logger.error(err)
    debug(err)
  }
})

async function cartoonResponseHandler(id, cartoonResponse){
  if (!cartoonResponse || cartoonResponse === "") {
    await CartoonService.updateOne({id}, {cancel: 1, utime: new Date()})
    return logger.warn(`Cant find cartoon . or maybe sold out!  (warn)`)
  }

  let cartoon = utils.parse2Object(cartoonResponse)

  let data = {
    fans: cartoon.result.stat.favorites,
    utime: new Date()
  }

  if(cartoon.result.rating){
    data.ratingCount = cartoon.result.rating.count
    data.ratingCode = cartoon.result.rating.score
  }

  await CartoonService.updateOne(data, {where: {id}})
}