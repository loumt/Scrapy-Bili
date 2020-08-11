const BaseService =require('./BaseService')
const  db = require('./../models')

class EmojiService extends BaseService{
    constructor(){
        super(db["Emoji"])
    }

}

module.exports = new EmojiService();