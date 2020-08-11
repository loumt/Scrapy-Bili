'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const RoleService = require('./../services/RoleService')
const _ = require('lodash');
const debug = require('debug')('bili:service')

class RoleController extends BaseController{
    constructor() {
        super();
    }

    list() {
        return [
            this.ValidationLimit(),
            this.ValidationPage(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {limit, page} = req.query
                    let offset = limit * (page - 1 )
                    let option = {limit, offset, where: {}}
                    let roles = await RoleService.findAndCountAll(option)
                    roles.page = page;
                    roles.limit = limit;
                    this.success(res,roles)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }


    remove() {
        return [
            this.param("id").exists(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {id} = req.params
                    await RoleService.deleteById(id)
                    this.success(res)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }
}

module.exports = new RoleController();