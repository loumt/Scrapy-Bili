'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const UperTaskService = require('./../services/UperTaskService')
const AttentionService = require('./../services/AttentionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')
const utils = require('./../utils/utils')
const RequestHandler = require('./../utils/RequestHander')
const CommonURLConfigure = require('./../constants/CommonURLConfigure')

class UperController extends BaseController{
  constructor() {
    super();
    this.service = UperService
  }

  getUperList() {
    return [
      this.query("name").optional().toString(),
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {name,limit,page } = req.query
        let skip = limit * (page -1 )
        try{
          let upers = await this.service.findAndCountAll({limit,skip});
          upers.page = page;
          upers.limit = limit;
          this.success(res,upers)
        }catch(err){
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  getUper(){
    return [
      this.param("bid").exists(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {bid} = req.params
        try{
          let uper = await this.service.findByMid(bid);
          this.success(res,uper)
        }catch(err){
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  findUper(){
    return [
      this.param("bid").exists(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {bid} = req.params
        try{
          let uperInfo = {}
          //查询资料
          let infoRes = await RequestHandler(CommonURLConfigure.UP_INFO.url.replace("#MID#", bid))
          let info =  utils.parse2Object(infoRes)

          uperInfo.bid = bid;
          uperInfo.name = info.data.name;
          uperInfo.sign = info.data.sign;
          uperInfo.face = info.data.face;
          uperInfo.level = info.data.level;
          this.success(res,uperInfo)
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
        this.body("name").exists(),
        this.utils.checkValidationResult(),
        async (req, res, next) => {
          let {bid,name} = req.body
          try {
            bid = parseInt(bid);
            let result = await AttentionService.findOneByBid(bid)
            if (result) {
              return this.error(res, ResultCode.ALREADY_ATTENTION)
            }

            await AttentionService.save({bid})

            let existTask = await UperTaskService.findOne({where: {bid}})
            if (existTask) {
              await UperTaskService.updateOne({repeat_tag: 1}, {bid})
            }else{
              await UperTaskService.save({repeat_tag: 1,bid , name})
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
