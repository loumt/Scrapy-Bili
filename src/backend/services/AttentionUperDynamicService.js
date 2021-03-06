const BaseService =require('./BaseService')
const  db = require('./../models')

class AttentionUperDynamicService extends BaseService{
  constructor(){
    super(db["AttentionUperDynamic"])
  }

  findByMid(mid){
    return this.findOne({
      where: {
        bid: mid
      }
    })
  }

  findByDid(did){
    return this.findOne({
      where: {
        did: did
      }
    })
  }

  findAll(mid){
    return this.find({
      where:{
        mid
      }
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }


}

module.exports = new AttentionUperDynamicService();