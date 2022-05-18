const BaseService =require('./BaseService')
const  db = require('./../models')

class RoleService extends BaseService{
    constructor(){
        super(db["Role"])
    }

    findByName(name){
        return super.findOne({where : {name}})
    }

}

module.exports = new RoleService();