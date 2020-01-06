const BaseService =require('./BaseService')
const  db = require('./../models')

class SendRequestService extends BaseService{
  constructor(){
    super(db["SendRequest"])
    this.TYPE = {
      USER: 1,
      SCHEDULE : 2
    }
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }

  //查询过去1 分钟内的请求数 (请求两分钟内的,提高容错)
  findCountBetween(){
    let now = new Date();
    let preTime = now.getTime() - 90 * 1000;
    let prefix = new Date(preTime)
    return this.count({
      stime: {
        [this.Op.lt]: now,
        [this.Op.gt]: prefix
      }
    })
  }
}

module.exports = new SendRequestService();