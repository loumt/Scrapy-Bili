const BaseService =require('./BaseService')
const  db = require('./../models')

class AttentionCartoonService extends BaseService{
  constructor(){
    super(db["AttentionCartoon"])
    this.CANCEL = {
      YES: 1,
      NO: 0
    }
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
      row: true,
      order: [
        ["utime", "ASC"]
      ]
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }


}

module.exports = new AttentionCartoonService();