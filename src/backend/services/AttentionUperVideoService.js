const BaseService =require('./BaseService')
const  db = require('./../models')

class AttentionUperVideoService extends BaseService{
  constructor(){
    super(db["AttentionUperVideo"])
  }

  findByMid(mid){
    return this.findOne({
      where: {
        bid: mid
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

  nextNull(){
    return this.findOne({where: {view: null}})
  }

  nextTask(){
    return this.findOne({
      order: [
        ["utime", "ASC"]
      ]
    })
  }

  findByAid(aid){
    return this.findOne({
      where: {
        aid: aid
      }
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }
}

module.exports = new AttentionUperVideoService();