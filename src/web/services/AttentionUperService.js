const BaseService =require('./BaseService')
const  db = require('./../models')

class AttentionUperService extends BaseService{
  constructor(){
    super(db["AttentionUper"])
    this.model.belongsTo(db['Uper'], {foreignKey:"bid", targetKey: "bid"})
  }

  findOneByBid(bid){
    return this.findOne({
      where: {
        bid
      }
    })
  }

  bulkCreate(list){
    return this.model.bulkCreate(list)
  }

  async findAndCountAll(options){
    let option = {
      raw: true,
      include:[
        {
          model: db['Uper']
        }
      ]
    }

    let result = await this.model.findAll(option)

    let rows  = [];
    result.forEach(item => {
      rows.push({
        id: item['id'],
        bid: item['Uper.bid'],
        face: item['Uper.face'],
        name: item['Uper.name'],
        sex: item['Uper.sex'],
        level: item['Uper.level'],
        sign: item['Uper.sign'],
        contribute: item['Uper.contribute'],
        attention: item['Uper.attention'],
        fans: item['Uper.fans'],
        play: item['Uper.play'],
        read: item['Uper.read'],
        ctime: item['Uper.ctime'],
        utime: item['Uper.utime'],
      })
    })
    return rows;
  }


  async findAndCountAllWithInfo(options){
    let option = {
      raw: true,
      include:[
        {
          model: db['Uper']
        }
      ],
      where: options.where,
      offset: options.skip,
      limit : options.limit
    }

    let result = await this.model.findAndCountAll(option)

    let rows  = [];
    result.rows.forEach(item => {
      rows.push({
        id: item['id'],
        bid: item['Uper.bid'],
        face: item['Uper.face'],
        name: item['Uper.name'],
        sex: item['Uper.sex'],
        level: item['Uper.level'],
        sign: item['Uper.sign'],
        contribute: item['Uper.contribute'],
        attention: item['Uper.attention'],
        fans: item['Uper.fans'],
        play: item['Uper.play'],
        read: item['Uper.read'],
        ctime: item['Uper.ctime'],
        utime: item['Uper.utime'],
      })
    })

    result.rows = rows;
    return result;
  }


  nextTask(){
    return this.findOne({
      order: [
        ["utime", "ASC"]
      ]
    })
  }

}

module.exports = new AttentionUperService();