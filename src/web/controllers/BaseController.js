const utils = require('./../utils/utils')
const logger = require('./../utils/log4js').api()
const ResultCode = require('./../constants/ResultCode')
const {body, query, param } = require('express-validator/check')
const debug = require('debug')('rps:api')

class BaseController {
  constructor() {
    this.utils = utils;
    this.body = body;
    this.query = query;
    this.param = param;
    this.ResultCode = ResultCode
    this.logger = logger;
    this.debug = debug;

    this.HISTORY= {
      TYPE:{
        CARTOON: 1,
        UPER: 2
      }
    }
  }


  systemInError(res) {
    return res.status(500).json(this.ResultCode.SYSTEM_ERROR)
  }

  /**
   * Error Response
   */
  error(res, errorCode) {
    return res.status(500).json(errorCode)
  }

  notFound(res) {
    return res.status(404).end()
  }


  pageList(res, list, count) {
    return res.status(200).json({
      data: list,
      count: count
    })
  }

  success(res, data) {
    if (data) {
      return res.status(200).json(data)
    }
    return res.status(200).end()
  }

  ValidationLimit() {
    return this.query('limit').optional().isInt({min: 0}).trim().toInt()
  }

  ValidationPage() {
    return this.query('page').optional().isInt({min: 1}).trim().toInt()
  }
}

module.exports = BaseController;