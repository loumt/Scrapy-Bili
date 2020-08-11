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
            this.utils.checkValidationResult(),
            async (req, res, next) => {
                try{
                    let {limit, page} = req.query
                    let offset = limit * (page - 1 )
                    let option = {limit, offset, where: {}}
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
}

module.exports = new EmojiController();