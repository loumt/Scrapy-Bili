const BaseService = require('./BaseService')
const db = require('./../models')

class SearchHistoryService extends BaseService {
  constructor() {
    super(db["SearchHistory"])
  }

  findOneByBid(bid) {
    return this.findOne({
      where: {
        bid
      }
    })
  }

  nextTask() {
    return this.findOne({
      order: [
        ["stime", "DESC"]
      ]
    })
  }

  bulkCreate(list) {
    return this.model.bulkCreate(list)
  }

  /**
   * 查询最近的历史查询
   * @param type {int}  类型 标识类型
   * @param limit {int} 个数 希望获得的参数
   */
  findRecentSearch(type, limit) {
    return this.model.findAll({
      where: {
        type
      },
      skip: 0,
      limit: limit,
      group: 'name',
      order: [
        ["stime", "DESC"]
      ]
    })
  }


}

module.exports = new SearchHistoryService();