const _ = require("lodash")
var https = require('https');
const utils = require('./../../utils/utils')
const logger = require('./../../utils/log4js').schedule()
const BaseSchedule = require('./BaseSchedule')
const AttentionUperService = require('../../services/AttentionUperService')
const EmojiService = require('../../services/EmojiService')
const AttentionUperDynamicService = require('../../services/AttentionUperDynamicService')
const AttentionUperVideoService = require('../../services/AttentionUperVideoService')

/**
 * 关注的Up主动态(包括文字动态与视频动态)
 */
class AttentionUperDynamicSchedule extends BaseSchedule {
    constructor() {
        super()
    }

    async getNextTask() {
        return await AttentionUperService.nextTask();
    }

    async run() {
        try {
            //获取任务
            // console.log('Attention Uper Dynamic Task ..... ' + new Date())
            let attention = await this.getNextTask();

            if (!attention || !attention.bid) return;
            this.logger.info(`AttentionUperDynamicSchedule => id:${attention.id} bid:${attention.bid}`)

            let {bid} = attention;
            if (!bid || bid === "") return logger.warn('Attention bid is empty. (warn)')

            // bid = 7103073

            logger.info(`正在获取 ${bid} 的动态信息.....`)
            let dynamicResponse = await this.RequestHandler(this.CommonURLConfigure.UPER_DYNAMIC_DETAIL.url.replace("#MID#", bid))
            await this.dynamicResponseHandler(dynamicResponse);

            logger.info(`正在获取 ${bid} 的视频信息.....`)
            let videoResponse = await this.RequestHandler(this.CommonURLConfigure.VIDEO.url.replace("#MID#", bid))
            await this.videoResponseHandler(videoResponse);

            logger.info(`完成获取 ${bid} 的信息,更新时间变更....`)
            await AttentionUperService.updateOne({id: attention.id}, {utime: new Date()})
        } catch (err) {
            if (err && err.statusCode === 412) return logger.error("触发B站风险控制了.")
            logger.error("--cartoonTask run---")
            logger.error(err)
        }
    }

    async dynamicResponseHandler(dynamicResponse) {
        try {
            if (!dynamicResponse || dynamicResponse === "")
                return logger.warn('Dynamic is empty. (warn)')

            let dynamic = utils.parse2Object(dynamicResponse)

            let {data: dynamicData} = dynamic;
            if (!dynamicData)
                return logger.error('Attention [data] is not found!')


            let {cards} = dynamicData;
            if (!cards)
                return logger.error('Attention [cards] is not found!')

            cards.every(await this.dynamicHandler.bind(this))
        } catch (err) {
            logger.error("--cartoonResponseHandler---")
            logger.error(err)
        }
    }


    async dynamicHandler(dynamicItem) {
        try {
            let {desc, card, display} = dynamicItem;

            //dynamic handler
            let cardObject = utils.parse2Object(card);
            let did = desc.rid.toString();
            let dynamic = {
                mid: desc.uid,
                did,
                type: desc.type,
                repost: desc.repost,
                like: desc.like,
                ptime: new Date(desc.timestamp * 1000)
            }

            switch (desc.type) {
                case 1:
                    dynamic.content = cardObject.item.content
                    dynamic.reply = cardObject.item.reply;
                    dynamic.title = cardObject.title
                    break;
                case 2:
                    dynamic.description = cardObject.item.description
                    dynamic.reply = cardObject.item.reply;
                    dynamic.title = cardObject.title
                    break;
                case 4:
                    dynamic.content = cardObject.item.content
                    dynamic.reply = cardObject.item.reply
                    break;
                case 8:
                    dynamic.dynamic = cardObject.dynamic
                    dynamic.reply = cardObject.stat.reply
                    dynamic.title = cardObject.title
                    dynamic.aid = cardObject.aid
                    break;
                case 16:
                    dynamic.description = cardObject.item.description
                    dynamic.reply = cardObject.item.reply
                    dynamic.title = cardObject.item.title
                    break;
                case 64:
                    dynamic.dynamic = cardObject.dynamic
                    break;
                case 256:
                    dynamic.title = cardObject.title
                    dynamic.content = cardObject.intro
                    break;
                case 2048:
                    dynamic.content = cardObject.vest.content
                    dynamic.reply = desc.comment
                    break;
                default:
            }

            let existDynamic = await AttentionUperDynamicService.findByDid(did)
            if (existDynamic) {
                dynamic.utime = new Date()
                await AttentionUperDynamicService.updateOne({did}, dynamic)
            } else {
                await AttentionUperDynamicService.save(dynamic)
            }

            //eomji handler
            if (display) {
                let {comment_info, emoji_info} = display;
                //emoji -> comment info
                if (comment_info) {
                    let {emojis} = comment_info;
                    if (emojis && Array.isArray(emojis) && emojis.length !== 0) {
                        emojis.forEach(await this.emoteHandler.bind(this))
                    }
                }
                //emoji -> emoji info
                if (emoji_info) {
                    let {emoji_details} = emoji_info;
                    if (emoji_details && Array.isArray(emoji_details) && emoji_details.length !== 0) {
                        emoji_details.forEach(await this.emoteHandler.bind(this))
                    }
                }
            }
        } catch (err) {
            logger.error(err)
        }
    }

    async videoResponseHandler(videoResponse) {
        if (!videoResponse || videoResponse === "")
            return logger.warn('Video is empty. (warn)')

        let video = utils.parse2Object(videoResponse)

        let {data: videoData} = video;
        if (!videoData) return logger.error('Video [data] is not found!')
        let {vlist} = videoData;
        if (!vlist || vlist.length === 0) return logger.error('Video [vlist] is not found or empty!')

        vlist.every(await this.videoHandler)
    }

    async videoHandler(videoItem) {
        let video = {
            mid: videoItem.mid,
            aid: videoItem.aid,
            title: videoItem.title,
            subtitle: videoItem.subtitle,
            comment: videoItem.comment,
            pic: videoItem.pic,
            length: videoItem.length,
            desc: videoItem.description,
            author: videoItem.author,
            ptime: new Date(videoItem.created * 1000)
        }

        let existVideo = await AttentionUperVideoService.findByAid(videoItem.aid);
        if (existVideo) {
            await AttentionUperVideoService.updateOne({aid: videoItem.aid}, video)
        } else {
            await AttentionUperVideoService.save(video)
        }
    }

    async emoteHandler(emote) {
        let {text, url} = emote;

        if (_.isEmpty(text) || _.isEmpty(url)) {
            return this.logger.warn(" Emoji Schedule emote text is empty or emote url is empty!")
        }
        if (!(_.startsWith(text, '[') && _.endsWith(text, ']'))) {
            return;
        }
        if (!_.startsWith(url, 'http')) {
            return this.logger.warn("Emoji Schedule emote url illegal !")
        }

        //handler
        let existEmote = await EmojiService.findOneByKey(text);
        if (existEmote && url !== existEmote.url) {
            await this.updateEmojiUrlAndData(existEmote.id, url);
        } else {
            await EmojiService.save({key: text, url})
        }
    }

    async updateEmojiUrlAndData(id, url) {
        https.get(url, res => {
            let chunks = [];
            let size = 0;
            res.on('data', chunk => {
                chunks.push(chunk);
                size += chunk.length;
            });

            res.on('end', async err => {
                let data = Buffer.concat(chunks, size);
                let base64Img = data.toString('base64');
                console.log(`id:${id} => ${url} => ${base64Img}`)
                await EmojiService.updateOne({id}, {data: base64Img, url});
            });
        });
    }
}

module.exports = new AttentionUperDynamicSchedule();