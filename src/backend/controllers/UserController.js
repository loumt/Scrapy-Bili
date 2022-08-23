'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UserService = require('./../services/UserService')
const UserRoleService = require('./../services/UserRoleService')
const LoginLogService = require('./../services/LoginLogService')
const {LOGIN_LOG_TYPE} = require('./../constants/SystemConstants')
const {token} = require("./../configure/app.config")
const CryptoUtil = require('./../utils/CryptoUtil');
const _ = require('lodash');
const cryptoUtil = require("./../utils/CryptoUtil")
const debug = require('debug')('bili:service')

class UserController extends BaseController {
    constructor() {
        super();
    }

    /**
     * 用户登录
     */
    login() {
        return [
            this.body("username").exists(),
            this.body("password").exists(),
            async (req, res, next) => {
                let {username, password} = req.body;
                try {
                    const user = await UserService.findByUsername(username);
                    if (!user) return this.error(res, this.ResultCode.LOGIN_FAIL_WITH_USER_NOT_EXIST)

                    let realPassword = cryptoUtil.cryptPwd(username, password, user.salt)
                    if (realPassword !== user.password) {
                        this.error(res, this.ResultCode.LOGIN_FAIL_WITH_PWD)
                    } else {
                        //创建一个Token
                        let serverToken = cryptoUtil.generateToken(user.id, username, token.maxAge)

                        //创建日志
                        let createLoginLog = {
                            username,
                            type: LOGIN_LOG_TYPE.LOGIN
                        }
                        await LoginLogService.save(createLoginLog)



                        console.log("LOGIN_FAIL_WITH_PWD");
                        this.success(res, {token: serverToken})
                    }
                } catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }

            }
        ]
    }

    /**
     * 用户登出
     */
    logout() {
        return [
            async (req, res, next) => {
                try {
                    let {authorization} = req.headers;
                    if (authorization === "" || authorization === null || authorization === 'undefined') return this.success(res)
                    let tokenParse = CryptoUtil.parseToken(authorization);

                    let {id, username, expireTimes} = tokenParse;

                    //判断用户
                    // let user = await UserService.findByPk(id)

                    //创建日志
                    let createLoginLog = {
                        username,
                        type: LOGIN_LOG_TYPE.LOGOUT
                    }
                    await LoginLogService.save(createLoginLog)

                    this.success(res)
                } catch (err) {
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
                try {
                    let {limit, page} = req.query
                    let offset = limit * (page - 1)
                    let option = {limit, offset, where: {}}
                    let users = await UserService.findAndCountAll(option)
                    users.page = page;
                    users.limit = limit;
                    this.success(res, users)
                } catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }

    roles() {
        return [
            this.ValidationLimit(),
            this.ValidationPage(),
            this.param("id").exists(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try {
                    let {limit, page} = req.query
                    let {id} = req.params;

                    let data = await UserRoleService.findRolesWithUserId(page, limit, id)
                    data.uid = id;
                    this.success(res,data)
                } catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }

    setRoles(){
        return [
            this.param("id").exists(),
            this.body("roleIds").exists(),
            this.utils.checkValidationResult(),
            async (req,res,next) =>{
                try{
                    let {id} = req.params;
                    let {roleIds} = req.body;

                    await UserRoleService.delete({uid: id})

                    let ur = []
                    roleIds.forEach(roleId=>{
                        ur.push({uid: id,rid: roleId})
                    })
                    await UserRoleService.saveAll(ur);

                    this.success(res)
                }catch(e){
                    this.logger.error(e)
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
                try {
                    let {id} = req.params

                    //查询用户
                    let user = await UserService.findByPk(id)

                    //管理员不可删除
                    if (user.isAdmin) return this.error(res, this.ResultCode.USER_CANT_DELETED)

                    await UserService.deleteById(id)
                    this.success(res)
                } catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }

    add() {
        return [
            this.body("username").exists(),
            this.body("nickname").exists(),
            this.body("password").exists(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try {
                    let {username, nickname, password} = req.body

                    //查询用户
                    let user = await UserService.findByUsername(username)

                    if (user) return this.error(res, this.ResultCode.USER_ALREADY_EXIST)

                    let salt = this.utils.randomString();
                    let realPassword = cryptoUtil.cryptPwd(username, password, salt);

                    let newUserModel = {
                        username,
                        nickname: nickname ? nickname : this.utils.randomString(),
                        password: realPassword,
                        salt
                    }
                    await UserService.save(newUserModel)
                    this.success(res)
                } catch (err) {
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }


    async validateToken(id, username, expireTimes) {
        if (id && username && expireTimes) {
            let user = await UserService.findByUsername(username)
            if (user.id !== parseInt(id)) return false;
            return Date.now() < parseInt(expireTimes)
        } else {
            return false;
        }
    }
}

module.exports = new UserController();