'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionService = require('./../services/AttentionService')
const VUperAttentionService = require('./../services/VUperAttentionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')


class AttentionController extends BaseController {
  constructor() {
    super();
    this.service = AttentionService
    this.vService = VUperAttentionService
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

  getAttentionList() {
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
        let skip = limit * (page - 1)
        try {
          let option = {limit, skip, where: {}}
          if(level) { option.where.level = parseInt(level) }
          if(uperId) { option.where.bid = { [this.service.Op.like]: `%${uperId}%` } }
          if(uperName) { option.where.name = { [this.service.Op.like]: `%${uperName}%`} }
          if(fanScope) {
            option.where.fans =  this.scope[fanScope]
          }
          let attentions = await this.vService.findAndCountAllWithInfo(option);
          attentions.page = page;
          attentions.limit = limit;
          this.success(res, attentions)
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
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {bid} = req.body
        try {
          let result = await this.service.findOneByBid(bid)
          if (result) {
            return this.error(res, ResultCode.ALREADY_ATTENTION)
          }

          await this.service.save({bid, utime: new Date()})
          this.success(res)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  deleteAttention() {
    return [
      this.param("id").exists(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {id} = req.params
        try {
          await this.service.deleteById(id)
          this.success(res)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }
}

module.exports = new AttentionController();
