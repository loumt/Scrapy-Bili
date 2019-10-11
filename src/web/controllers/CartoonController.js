'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const CartoonService = require('./../services/CartoonService')
const _ = require('lodash');
const debug = require('debug')('bili:service')
const RequestHander = require('./../utils/RequestHander')
const utils = require('./../utils/utils')
const CommonURLConfigure = require('./../constants/CommonURLConfigure')

class CartoonController extends BaseController {
  constructor() {
    super();
    this.service = CartoonService
    this.scope = {
      fan: {
        1: {[this.service.Op.gte]: 100000},
        2: {[this.service.Op.gte]: 500000},
        3: {[this.service.Op.gte]: 1000000},
        4: {[this.service.Op.gte]: 5000000},
        5: {[this.service.Op.gte]: 10000000}
      },
      ratingCode: {
        1: {[this.service.Op.lte]: 7.0},
        2: {[this.service.Op.gte]: 7.0, [this.service.Op.lte]: 8.0},
        3: {[this.service.Op.gte]: 8.0, [this.service.Op.lte]: 9.0},
        4: {[this.service.Op.gte]: 9.0, [this.service.Op.lte]: 9.5},
        5: {[this.service.Op.gte]: 9.5}
      }
    }
  }

  getCartoonList() {
    return [
      this.query("cartoonId").optional().toInt(),
      this.query("cartoonName").optional().toString(),
      this.query("fanScope").optional().toInt(),
      this.query("ratingScope").optional().toInt(),
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {limit, page, cartoonId, cartoonName, fanScope, ratingScope } = req.query
        let skip = limit * (page - 1)
        try {
          let option = {limit, skip, where: {}}
          if(cartoonId) { option.where.mid = { [this.service.Op.like]: `%${cartoonId}%` } }
          if(cartoonName) { option.where.name = { [this.service.Op.like]: `%${cartoonName}%`} }
          if(fanScope) {
            option.where.fans =  this.scope.fan[fanScope]
          }
          if(ratingScope) {
            option.where.ratingCode =  this.scope.ratingCode[ratingScope]
          }

          let attentions = await this.service.findAndCountAll(option);
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

  findCartoonRemote() {
    return [
      this.param("cartoonId").exists(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {cartoonId} = req.params
        try {
          console.log(`cartoonId:${cartoonId}`)

          let responseBody = await RequestHander(CommonURLConfigure.CARTOON_DETAIL.url.replace("#MID#", cartoonId))
          if (!responseBody || responseBody === "") {
            return this.notFound()
          }

          let result = utils.parse2Object(responseBody)
          // console.dir(result)

          //海报 result.cover
          //mid result.media_id
          //origin_name result.origin_name
          //ratingCode result.rating.score
          //ratingCount result.rating.count
          //fans result.stat.favorites

          this.success(res, result.result)

        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  saveAttentionCartoon() {
    return [
      this.body("mid").exists(),
      this.body("name").exists(),
      this.body("originName").exists(),
      this.body("banner").exists(),
      this.body("fans").exists(),
      this.body("ratingCode").optional(),
      this.body("ratingCount").optional(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let body = req.body
        try {
          let result = await this.service.findOneByMid(body.mid)
          if (result) {
            return this.error(res, ResultCode.ALREADY_ATTENTION)
          }

          await this.service.save(body)
          this.success(res)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

  removeCartoon() {
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

module.exports = new CartoonController();
