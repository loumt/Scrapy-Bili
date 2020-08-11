'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UserService = require('./../services/UserService')
const LoginLogService = require('./../services/LoginLogService')
const {LOGIN_LOG_TYPE} = require('./../constants/SystemConstants')
const {token} = require("./../configure/app.config")
const CryptoUtil = require('./../utils/CryptoUtil');
const _ = require('lodash');
const cryptoUtil = require("./../utils/CryptoUtil")
const debug = require('debug')('bili:service')

class UserController extends BaseController{
    constructor() {
        super();
    }

    /**
     * 用户登录
     */
    login(){
        return [
            this.body("username").exists(),
            this.body("password").exists(),
            async (req,res, next) =>{
                let {username ,password }=  req.body;
                try{
                    const user = await UserService.findByUsername(username);
                    if(!user) return this.error(res,this.ResultCode.LOGIN_FAIL_WITH_USER_NOT_EXIST)

                    let realPassword = cryptoUtil.cryptPwd(username,password, user.salt)
                    if(realPassword !== user.password ){
                        this.error(res,this.ResultCode.LOGIN_FAIL_WITH_PWD)
                    }else{
                        //创建一个Token
                        let serverToken = cryptoUtil.generateToken(user.id, username, token.maxAge )

                        //创建日志
                        let createLoginLog = {
                            username,
                            type:LOGIN_LOG_TYPE.LOGIN
                        }
                        await LoginLogService.save(createLoginLog)

                        this.success(res, {token: serverToken})
                    }
                }catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }

            }
        ]
    }

    /**
     * 用户登出
     */
    logout(){
        return [
            async (req,res, next) =>{
                try{
                    let {authorization} = req.headers;
                    if(authorization === "" || authorization === null || authorization === 'undefined')  return this.success(res)
                    let tokenParse = CryptoUtil.parseToken(authorization);

                    let {id,username,expireTimes} = tokenParse;

                    //判断用户
                    // let user = await UserService.findByPk(id)

                    //创建日志
                    let createLoginLog = {
                        username,
                        type:LOGIN_LOG_TYPE.LOGOUT
                    }
                    await LoginLogService.save(createLoginLog)

                    this.success(res)
                }catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
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
                    let users = await UserService.findAndCountAll(option)
                    users.page = page;
                    users.limit = limit;
                    this.success(res, users)
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

                    //查询用户
                    let user = await UserService.findByPk(id)

                    //管理员不可删除
                    if(user.isAdmin) return this.error(res,this.ResultCode.USER_CANT_DELETED)

                    await UserService.deleteById(id)
                    this.success(res)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }


    async validateToken(id,username,expireTimes){
        if(id && username && expireTimes) {
            let user = await UserService.findByUsername(username)
            if(user.id !== parseInt(id)) return false;
            return Date.now() < parseInt(expireTimes)
        }else{
            return false;
        }
    }
}

module.exports = new UserController();