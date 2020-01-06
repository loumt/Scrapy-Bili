'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionUperService = require('../services/AttentionUperService')
const AttentionUperDynamicService = require('../services/AttentionUperDynamicService')
const AttentionUperVideoService = require('../services/AttentionUperVideoService')
const VUperAttentionService = require('./../services/VUperAttentionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')


class VideoController extends BaseController {
  constructor() {
    super();
  }

  getVideoList() {
    return [
      this.param("id").optional().toInt(),
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {limit, page} = req.query, {id} = req.params;
        let skip = limit * (page - 1)
        try {
          let uper = await UperService.findByMid(id)
          if(!uper){
            return this.notFound(res)
          }

          let option = {limit, skip, where: {mid: id}}

          let result = {}
          let dynamics = await AttentionUperVideoService.find(option);
          result.rows = dynamics
          result.page = page;
          result.limit = limit;
          result.uper = uper;
          this.success(res, result)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }
}

module.exports = new VideoController();
