const _ = require('lodash')
const ResultCode = require('./../constants/ResultCode')

exports.resJson = function (req, res, next) {
  res.json200 = function(data){
    res.status(200);
    res.json(data);
  }
  res.jsonParse = function (resultModel) {
    if (_.findKey(ResultCode, resultModel)) {
      res.status(200).json(resultModel);
    } else {
      res.status(200).json(ResultCode.SYSTEM_ERROR);
    }
  }
  next();
}
