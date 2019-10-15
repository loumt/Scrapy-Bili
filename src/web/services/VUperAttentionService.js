const BaseService =require('./BaseService')
const  db = require('./../models')

class VUperAttentionService extends BaseService{
  constructor(){
    super(db["VUperAttention"])
  }

  findOneByBid(bid){
    return this.findOne({
      where: {
        bid
      }
    })
  }


  async findAndCountAllWithInfo(options){
    let option = {
      raw: true,
      where: options.where,
      offset: options.skip,
      limit : options.limit
    }

    let result = await this.model.findAndCountAll(option)
    return result;
  }

}

module.exports = new VUperAttentionService();