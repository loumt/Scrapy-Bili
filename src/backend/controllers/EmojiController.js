'use strict'
const BaseController =require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const EmojiService = require('./../services/EmojiService')
const _ = require('lodash');
const debug = require('debug')('bili:service')

class EmojiController extends BaseController{
    constructor() {
        super();
    }

    list() {
        return [
            this.ValidationLimit(),
            this.ValidationPage(),
            this.query("keyPart").toString(),
            this.query("urlPart").toString(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {limit, page,keyPart} = req.query
                    let offset = limit * (page - 1 )
                    let where = {}
                    if(keyPart) where.key = {
                        [EmojiService.Op.like]: `%${keyPart}%`
                    }
                    let option = {limit, offset, where}
                    option.order = [['ctime', 'DESC']]
                    let emojis = await EmojiService.findAndCountAll(option)
                    emojis.page = page;
                    emojis.limit = limit;
                    this.success(res,emojis)
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
                    await EmojiService.deleteById(id)
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
            this.body("key").isLength({min:2}).exists(),
            this.body("url").exists(),
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {key,url} = req.body

                    let emoji = await EmojiService.findOneByKey(key)
                    if(emoji) return this.error(res,this.ResultCode.EMOJI_ALREADY_EXIST)

                    await EmojiService.save({key,url})
                    this.success(res)
                }catch(err){
                    this.logger.error(err)
                    this.systemInError(res)
                }
            }
        ]
    }
}

module.exports = new EmojiController();