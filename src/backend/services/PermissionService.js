const BaseService =require('./BaseService')
const  db = require('./../models')

class PermissionService extends BaseService{
    constructor(){
        super(db["Permission"])
    }


    findByCode(code){
        return super.findOne({where : {code}})
    }
}

module.exports = new PermissionService();