'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const RoleService = require('./../services/RoleService')
const RolePermissionService = require('./../services/RolePermissionService')
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


    add() {
        return [
            this.body("name").exists(),
            this.body("remark").exists(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {name,remark} = req.body
                    let role = await RoleService.findByName(name)

                    if(role) return this.error(res,this.ResultCode.ROLE_ALREADY_EXIST)

                    let newRole = {name, remark}
                    await RoleService.save(newRole)
                    this.success(res)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }

    permissions() {
        return [
            this.ValidationLimit(),
            this.ValidationPage(),
            this.param("id").exists(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try {
                    let {limit, page} = req.query
                    let {id} = req.params;

                    let data = await RolePermissionService.findPermissionsWithRoleId(page, limit, id)
                    data.uid = id;
                    this.success(res,data)
                } catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }

    setPermissions(){
        return [
            this.param("id").exists(),
            this.body("permissionIds").exists(),
            this.utils.checkValidationResult(),
            async (req,res,next) =>{
                try{
                    let {id} = req.params;
                    let {permissionIds} = req.body;

                    await RolePermissionService.delete({rid: id})

                    let rp = []
                    permissionIds.forEach(permissionId=>{
                        rp.push({rid: id,pid: permissionId})
                    })
                    await RolePermissionService.saveAll(rp);
                    this.success(res)
                }catch(e){
                    this.logger.error(e)
                    this.systemInError(res)
                }
            }
        ]
    }

}

module.exports = new RoleController();