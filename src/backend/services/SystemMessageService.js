const BaseService =require('./BaseService')
const  db = require('./../models')

class SystemMessageService extends BaseService{
    constructor(){
        super(db["SystemMessage"])
    }

}

module.exports = new SystemMessageService();