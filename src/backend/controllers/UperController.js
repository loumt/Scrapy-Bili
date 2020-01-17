'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const UperTaskService = require('./../services/UperTaskService')
const AttentionUperService = require('../services/AttentionUperService')
const SearchHistoryService = require('./../services/SearchHistoryService')
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
      1: {[this.service.Op.lte]: 10000},
      2: {[this.service.Op.lte]: 50000},
      3: {[this.service.Op.lte]: 100000},
      4: {[this.service.Op.lte]: 500000},
      5: {[this.service.Op.gte]: 500000, [this.service.Op.lte]: 1000000},
      6: {[this.service.Op.gte]: 1000000},
      7: {[this.service.Op.gte]: 10000000}
    }
  }

  list() {
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
          if (level) {
            option.where.level = parseInt(level)
          }
          if (uperId) {
            option.where.bid = {[this.service.Op.like]: `%${uperId}%`}
          }
          if (uperName) {
            option.where.name = {[this.service.Op.like]: `%${uperName}%`}
          }
          if (fanScope) {
            option.where.fans = this.scope[fanScope]
          }
          let upers = await this.service.findAndCountAll(option);
          upers.page = page;
          upers.limit = limit;
          upers.rows = await this.convertUperAttention(upers.rows)
          this.success(res, upers)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  find() {
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
          if (!infoRes || infoRes === "")
            return this.error(res, ResultCode.NOT_FOUND)
          let info = utils.parse2Object(infoRes)

          if (info.code === -404)
            return this.error(res, ResultCode.NOT_FOUND)

          uperInfo.bid = info.data.mid;
          uperInfo.name = info.data.name;
          uperInfo.sign = info.data.sign;
          uperInfo.sex = info.data.sex;
          uperInfo.face = info.data.face;
          uperInfo.level = info.data.level;

          //查询是否已关注
          let isAttentionUp = await AttentionUperService.findOneByBid(bid);
          uperInfo.isAttention = Boolean(isAttentionUp);

          // console.dir(info)

          await SearchHistoryService.save({bid: bid, name: info.data.name, type: this.HISTORY.TYPE.UPER})

          this.success(res, uperInfo)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  async convertUperAttention(upers) {
    if (!upers || upers.length === 0) return upers;

    async function isAttention(uper) {
      let exist = await AttentionUperService.findOneByBid(uper.bid);
      uper.isAttention = exist ? true : false;
    }

    for (let uper of upers) {
      uper = uper.dataValues;
      await isAttention(uper)
    }
    return upers
  }

}

module.exports = new UperController();
