'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionUperService = require('../services/AttentionUperService')
const AttentionCartoonService = require('../services/AttentionCartoonService')
const _ = require('lodash');
const debug = require('debug')('bili:service')

class NavigationController extends BaseController{
  constructor() {
    super();
  }

  info() {
    return [
      async (req, res, next) => {
        try{
          let upCount = await UperService.count()
          let upAttentionCount = await AttentionUperService.count()
          let cartoonAttentionCount = await AttentionCartoonService.count()

          this.success(res,{upCount,upAttentionCount,cartoonAttentionCount})
        }catch(err){
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }
}

module.exports = new NavigationController();
