const BaseService =require('./BaseService')
const  db = require('./../models')

class LoginLogService extends BaseService{
    constructor(){
        super(db["LoginLog"])
    }

}

module.exports = new LoginLogService();