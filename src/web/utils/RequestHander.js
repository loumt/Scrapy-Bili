
const rp = require('request-promise')
const _ = require('lodash')
const UserAgent = require('./../lib/UserAgent')

module.exports = (url , headerConfig ) => {
  let headers = {
    "User-Agent": UserAgent(),
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache"
  }
  if(headerConfig){
    _.assign(headers,headerConfig)
  }
  return rp({url, headers})
}