const rp = require('request-promise')
const _ = require('lodash')
const SendRequestService = require('./../services/SendRequestService')
const UserAgent = require('./../lib/UserAgent')

module.exports = async (url, headerConfig, type ) => {
  let headers = {
    "User-Agent": UserAgent(),
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache"
  }

  if (typeof headerConfig === 'object') {
    if (headerConfig) {
      _.assign(headers, headerConfig)
    }
  }

  let requestType = SendRequestService.TYPE.USER

  if (headerConfig && typeof headerConfig === 'number') {
    requestType = headerConfig;
  }
  if (type && typeof type === 'number') {
    requestType = type;
  }

  await SendRequestService.save({url, type: requestType, stime: new Date()})

  return rp({url, headers})
}