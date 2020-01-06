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
          let recentHistory = await this.service.findRecentSearch(type,limit);
          this.success(res, recentHistory)
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

}

module.exports = new HistoryController();
