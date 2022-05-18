const rp = require('request-promise')
const _ = require('lodash')
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
    return rp({url, headers})
}