'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionService = require('./../services/AttentionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')

class AttentionController extends BaseController{
  constructor() {
    super();
    this.service = AttentionService
  }

  getAttentionList() {
    return [
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {limit,page} = req.query
        let skip = limit * (page - 1)
        try{
          let attentions = await this.service.findAndCountAllWithInfo({limit,skip});
          attentions.page = page;
          attentions.limit = limit;
          this.success(res,attentions)
        }catch(err){
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  addAttention(){
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

          await this.service.save({bid, utime: new Date() })
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
