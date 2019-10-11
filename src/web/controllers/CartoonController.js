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
  }

  getCartoonList() {
    return [
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {limit, page} = req.query
        let skip = limit * (page - 1)
        try {
          let attentions = await this.service.findAndCountAll({limit, skip});
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
