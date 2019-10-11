'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const UperTaskService = require('./../services/UperTaskService')
const AttentionService = require('./../services/AttentionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')
const utils = require('./../utils/utils')
const RequestHandler = require('./../utils/RequestHander')
const CommonURLConfigure = require('./../constants/CommonURLConfigure')

class UperController extends BaseController {
  constructor() {
    super();
    this.service = UperService
    this.scope = {
      1: { [this.service.Op.lte]: 10000},
      2: { [this.service.Op.lte]: 50000},
      3: { [this.service.Op.lte]: 100000},
      4: { [this.service.Op.lte]: 500000},
      5: { [this.service.Op.gte]: 500000, [this.service.Op.lte]: 1000000},
      6: { [this.service.Op.gte]: 1000000},
      7: { [this.service.Op.gte]: 10000000}
    }
  }

  getUperList() {
    return [
      this.query("uperId").optional().toInt(),
      this.query("level").optional().toInt(),
      this.query("fanScope").optional().toInt(),
      this.query("uperName").optional().toString(),
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {limit, page, level, uperId, uperName, fanScope} = req.query

        try {
          let skip = limit * (page - 1 )
          let option = {limit, skip, where: {}}
          if(level) { option.where.level = parseInt(level) }
          if(uperId) { option.where.bid = { [this.service.Op.like]: `%${uperId}%` } }
          if(uperName) { option.where.name = { [this.service.Op.like]: `%${uperName}%`} }
          if(fanScope) {
            option.where.fans =  this.scope[fanScope]
          }
          let upers = await this.service.findAndCountAll(option);
          upers.page = page;
          upers.limit = limit;
          this.success(res, upers)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  getUper() {
    return [
      this.param("bid").exists(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {bid} = req.params
        try {
          let uper = await this.service.findByMid(bid);
          this.success(res, uper)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  findUper() {
    return [
      this.param("bid").exists(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {bid} = req.params
        try {
          let uperInfo = {}
          //查询资料
          let infoRes = await RequestHandler(CommonURLConfigure.UP_INFO.url.replace("#MID#", bid))
          let info = utils.parse2Object(infoRes)

          uperInfo.bid = bid;
          uperInfo.name = info.data.name;
          uperInfo.sign = info.data.sign;
          uperInfo.face = info.data.face;
          uperInfo.level = info.data.level;
          this.success(res, uperInfo)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  addAttention() {
    return [
      this.body("bid").exists(),
      this.body("name").exists(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {bid, name} = req.body
        try {
          bid = parseInt(bid);
          let result = await AttentionService.findOneByBid(bid)
          if (result) {
            return this.error(res, ResultCode.ALREADY_ATTENTION)
          }

          await AttentionService.save({bid})

          let existTask = await UperTaskService.findOne({where: {bid}})
          if (existTask) {
            await UperTaskService.updateOne({urgent: UperTaskService.URGENT.YES}, {bid})
          } else {
            await UperTaskService.save({urgent: UperTaskService.URGENT.YES, bid, name})
          }

          this.success(res)
        } catch (err) {
          console.log(err)
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

}

module.exports = new UperController();
