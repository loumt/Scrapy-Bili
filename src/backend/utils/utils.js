const logger = require('./log4js').api()
const { validationResult } = require('express-validator/check')

function checkValidationResult () {
  return function (req, res, next) {
    let results = validationResult(req)
    if (!results.isEmpty()) {
      logger.warn(results.array())
      return res.status(422).json({errors: results.array()})
    } else {
      next()
    }
  }
}
exports.checkValidationResult = checkValidationResult

// sortStr = "k1 -k2"
function checkSort (supportkeys=[]) {
  return function (sortStr) {
    let unSupportKeys = sortStr
      .split(" ")
      .filter(key => key ? true : false)
      .map(key => key.startsWith('-') ? key.substr(1) : key)
      .filter(key => !supportkeys.includes(key))

    if (unSupportKeys.length >= 1) {
      throw new Error(`Unsupport Sort Keys: ${unSupportKeys.join(',')}`)
    }

    return true
  }
}
exports.checkSort = checkSort


function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {return val;}
  if (port >= 0) {return port;}
  return false;
}
exports.normalizePort = normalizePort

function formatUTC(utc_datetime) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('Z');
  var year_month_day = utc_datetime.substr(0,T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
  var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp/1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  var timestamp = timestamp+8*60*60;

  // 时间戳转为时间
  var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  return beijing_datetime;
}
exports.formatUTC = formatUTC


function parse2Object(str){
  return JSON.parse(str)
}
exports.parse2Object = parse2Object

let TEXT_GROUP = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomString(length = 8) {
  let result = '';
  for (let i = length; i > 0; --i) result += TEXT_GROUP[Math.floor(Math.random() * TEXT_GROUP.length)];
  return result;
}
exports.randomString = randomString