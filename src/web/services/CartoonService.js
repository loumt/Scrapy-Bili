const BaseService =require('./BaseService')
const  db = require('./../models')

class CartoonService extends BaseService{
  constructor(){
    super(db["Cartoon"])
  }

  findOneByMid(mid){
    return this.findOne({
      where: {
        mid
      }
    })
  }

  nextTask(){
    return this.findOne({
      order: [
        ["utime", "ASC"]
      ]
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }


}

module.exports = new CartoonService();