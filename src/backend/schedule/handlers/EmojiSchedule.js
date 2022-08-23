const BaseSchedule = require('./BaseSchedule')
const _ = require("lodash")
const utils = require('./../../utils/utils')
const EmojiService = require("./../../services/EmojiService")

class EmojiSchedule extends BaseSchedule {
    constructor() {
        super()
    }

    async run() {
        try {
            let responseEmoji = await this.RequestHandler(this.CommonURLConfigure.FIND_EMOJI_LIST.url)
            await this.handlerEmojiResponse(responseEmoji);
        } catch (e) {
            this.logger.error("--EmojiSchedule Error---")
            this.logger.error(e)
        }
    }

    async handlerEmojiResponse(responseString) {
        try {
            if (_.isEmpty(responseString)) {
                return this.logger.warn(`Cant find cartoon . or maybe sold out!  (warn)`)
            }
            let emojiListJO = utils.parse2Object(responseString);
            if (emojiListJO.code !== 0) {
                return this.logger.warn(`EmojiSchedule request not success ! `);
            }
            let data = emojiListJO.data;
            if (_.isEmpty(data)) {
                return this.logger.warn(`EmojiSchedule data is empty ! `)
            }
            let packages = data.packages;
            if (_.isEmpty(packages)) {
                return this.logger.warn(`EmojiSchedule packages is empty ! `)
            }
            let emotes = []
            for(let emojiList of packages){
                emotes = _.concat(emotes, emojiList.emote)
            }
            emotes.forEach(await this.handlerEmote.bind(this))
        } catch (err) {
            if (err && err.statusCode === 412) return this.logger.error("触发B站风险控制了.")
            this.logger.error("--EmojiSchedule Handler---")
            this.logger.error(err)
        }
    }

    async handlerEmote(emote) {
        if(_.isEmpty(emote)){
            return this.logger.warn(" Emoji Schedule emote is empty!")
        }
        let {text, url} = emote;
        if(_.isEmpty(text) || _.isEmpty(url)){
            return this.logger.warn(" Emoji Schedule emote text is empty or emote url is empty!")
        }
        if(!(_.startsWith(text , '[') && _.endsWith(text, ']'))){
            return;
        }
        if(!_.startsWith(url , 'http')){
            return this.logger.warn("Emoji Schedule emote url illegal !")
        }

        //handler
        let existEmote = await EmojiService.findOneByKey(text);
        if(existEmote) {
            await EmojiService.updateOne({id: existEmote.id}, {url})
        }else{
            await EmojiService.save({key: text, url})
        }

    }

}

module.exports = new EmojiSchedule();