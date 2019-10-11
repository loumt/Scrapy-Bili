const BaseService =require('./BaseService')
const  db = require('./../models')

class SearchHistoryService extends BaseService{
  constructor(){
    super(db["SearchHistory"])
  }

  findOneByBid(bid){
    return this.findOne({
      where: {
        bid
      }
    })
  }

  nextTask(){
    return this.findOne({
      order: [
        ["stime", "DESC"]
      ]
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }


}

module.exports = new SearchHistoryService();