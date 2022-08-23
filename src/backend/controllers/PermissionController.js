'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const PermissionService = require('./../services/PermissionService')
const _ = require('lodash');
const debug = require('debug')('bili:service')

class PermissionController extends BaseController{
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
                    let permissions = await PermissionService.findAndCountAll(option)
                    permissions.page = page;
                    permissions.limit = limit;
                    this.success(res,permissions)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }

    update() {
        return [
            this.param("id").exists(),
            this.body("disable").isInt({min:0,max:1}).toInt(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {id} = req.params
                    let {disable} = req.body
                    console.log({id,disable})
                    await PermissionService.updateOne({id}, {disable})
                    this.success(res)
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
                    await PermissionService.deleteById(id)
                    this.success(res)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }

    add() {
        return [
            this.body("code").exists(),
            this.body("desc").exists(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {code,desc} = req.body
                    let permission = await PermissionService.findByCode(code)

                    if(permission) return this.error(res,this.ResultCode.PERMISSION_ALREADY_EXIST)

                    let newPermission = {code, desc}
                    await PermissionService.save(newPermission)
                    this.success(res)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }
}

module.exports = new PermissionController();