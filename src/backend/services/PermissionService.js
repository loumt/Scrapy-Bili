const BaseService =require('./BaseService')
const  db = require('./../models')

class PermissionService extends BaseService{
    constructor(){
        super(db["Permission"])
    }

}

module.exports = new PermissionService();