const BaseSchedule = require('./BaseSchedule')
const EmojiService =require("./../../services/EmojiService")

class EmojiSchedule extends BaseSchedule{
    constructor(){super()}

    async run(){
        try {
            //下载Base



            //保存


        }catch (e) {
            console.log(e)
        }
    }

}

module.exports = new EmojiSchedule();