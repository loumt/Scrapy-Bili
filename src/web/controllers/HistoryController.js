'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionUperService = require('../services/AttentionUperService')
const AttentionCartoonService = require('../services/AttentionCartoonService')
const AttentionUperDynamicService = require('../services/AttentionUperDynamicService')
const AttentionUperVideoService = require('../services/AttentionUperVideoService')
const SearchHistoryService = require('./../services/SearchHistoryService')
const _ = require('lodash');
const DateUtil =require('./../utils/DateUtil')
const debug = require('debug')('bili:service')
const xlsx = require('node-xlsx');
const path = require('path')
const fs = require('fs')

class HistoryController extends BaseController {
  constructor() {
    super();
    this.service = SearchHistoryService;
  }

  list(){
    return [
      this.param("type").exists(),
      this.ValidationLimit(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {type} = req.params,{limit} = req.query;
        try {
          let history = await this.service.find({where:{type}, skip:0,limit: limit,  order: [
            ["stime", "DESC"]
          ]});
          this.success(res, history)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

}

module.exports = new HistoryController();
