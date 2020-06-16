const _ = require("lodash")
const utils = require('./../utils/utils')
const BaseSchedule = require('./../schedule/handlers/BaseSchedule')

class AttentionUperVideoSchedule extends BaseSchedule {
    constructor() {
        super()
    }

    async run() {
        try {
            let aid=7475950;
            let videoResponse = await this.RequestHandler(this.CommonURLConfigure.VIDEO_DETAIL.url.replace("#AID#", aid))
            await this.videoResponseHandler(videoResponse)
        } catch (err) {
            if (err && err.statusCode === 412) return console.log("触发B站风险控制了.")
            console.log(err)
        }
    }

    async videoResponseHandler(videoResponseHandler) {

        if (!videoResponseHandler || videoResponseHandler === "") {
            return console.dir('Video is empty. (warn)')
        }

        let video = utils.parse2Object(videoResponseHandler)

        if (video.code === 62002){
        }
        if (video.code === 62002) return console.dir(`Video had been deleted!`);

        let {data} = video;
        if (!data.stat) {
            return console.dir('Video  [data.stat] is empty. (warn)')
        }

        console.dir({
            utime: new Date(),
            coin: data.stat.coin,
            share: data.stat.share,
            like: data.stat.like,
            favorite: data.stat.favorite,
            danmaku: data.stat.danmaku,
            view: data.stat.view,
            comment: data.stat.reply,
            duration: data.duration
        })

    }

}


new AttentionUperVideoSchedule().run();