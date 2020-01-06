const BaseService =require('./BaseService')
const  db = require('./../models')

class UperTaskService extends BaseService{
  constructor(){
    super(db["UperTask"])
    this.URGENT = {
      YES: 1,
      NO: 0
    }
  }

  nextTask(){
    return this.findOne({
      where: {
        repeat_tag : 0
      },
      order: [
        ["ctime", "ASC"]
      ]
    })
  }

  /**
   * 查询下一个急迫任务
   * @return {*}
   */
  taskInUrgent(){
    return this.findOne({
      where: {
        urgent : this.URGENT.YES
      },
      order: [
        ["ctime", "ASC"]
      ]
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }

}

module.exports = new UperTaskService();