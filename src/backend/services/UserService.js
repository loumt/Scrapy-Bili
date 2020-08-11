const BaseService =require('./BaseService')
const  db = require('./../models')

class UserService extends BaseService{
    constructor(){
        super(db["User"])
    }

    findByUsername(username){
        return super.findOne({where : {username}})
    }

}

module.exports = new UserService();