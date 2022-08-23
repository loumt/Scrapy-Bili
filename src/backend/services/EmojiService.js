const BaseService =require('./BaseService')
const  db = require('./../models')

class EmojiService extends BaseService{
    constructor(){
        super(db["Emoji"])
    }

    findOneByKey(key){
        return super.findOne({where : {key} , raw: true})
    }

}

module.exports = new EmojiService();