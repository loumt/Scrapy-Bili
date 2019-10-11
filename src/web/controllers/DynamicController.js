'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionService = require('./../services/AttentionService')
const DynamicService = require('./../services/DynamicService')
const VUperAttentionService = require('./../services/VUperAttentionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')


class DynamicController extends BaseController {
  constructor() {
    super();
    this.service = DynamicService
  }

  getDynamicList() {
    return [
      this.param("uperId").optional().toInt(),
      this.ValidationLimit(),
      this.ValidationPage(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {limit, page} = req.query
        let skip = limit * (page - 1)
        try {
          let option = {limit, skip, where: {mid: req.params.uperId}}

          let attentions = await this.service.find(option);
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
}

module.exports = new DynamicController();
