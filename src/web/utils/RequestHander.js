
const rp = require('request-promise')
const _ = require('lodash')

module.exports = (url , headerConfig ) => {
  let headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache"
  }

  if(headerConfig){
    _.assign(headers,headerConfig)
  }

  return rp({url, headers})
}