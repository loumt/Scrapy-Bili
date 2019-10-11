const BaseService =require('./BaseService')
const  db = require('./../models')

class UperService extends BaseService{
  constructor(){
    super(db["Uper"])
  }

  findByMid(mid){
    return this.findOne({
      where: {
        bid: mid
      }
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }


}

module.exports = new UperService();