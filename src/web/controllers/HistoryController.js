'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionService = require('./../services/AttentionService')
const CartoonService = require('./../services/CartoonService')
const DynamicService = require('./../services/DynamicService')
const VideoService = require('./../services/VideoService')
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
  }

}

module.exports = new HistoryController();
