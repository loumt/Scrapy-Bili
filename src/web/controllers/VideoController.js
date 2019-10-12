'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionService = require('./../services/AttentionService')
const DynamicService = require('./../services/DynamicService')
const VideoService = require('./../services/VideoService')
const VUperAttentionService = require('./../services/VUperAttentionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')


class VideoController extends BaseController {
  constructor() {
    super();
    this.service = VideoService
  }

  getVideoList() {
    return [
      this.param("uperId").optional().toInt(),
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {limit, page} = req.query
        let skip = limit * (page - 1)
        try {
          let uper = await UperService.findByMid(req.params.uperId)
          if(!uper){
            return this.notFound(res)
          }

          let option = {limit, skip, where: {mid: req.params.uperId}}

          let result = {}
          let dynamics = await this.service.find(option);
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
