const BaseService =require('./BaseService')
const  db = require('./../models')

class UperTaskService extends BaseService{
  constructor(){
    super(db["UperTask"])
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
  taskInNext(){
    return this.findOne({
      where: {
        repeat_tag : 1
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