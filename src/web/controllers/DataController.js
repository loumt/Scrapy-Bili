'use strict'
const BaseController = require('./BaseController')
const ResultCode = require('./../constants/ResultCode');
const UperService = require('./../services/UperService')
const AttentionService = require('./../services/AttentionService')
const CartoonService = require('./../services/CartoonService')
const DynamicService = require('./../services/DynamicService')
const VideoService = require('./../services/VideoService')
const _ = require('lodash');
const DateUtil =require('./../utils/DateUtil')
const debug = require('debug')('bili:service')
const xlsx = require('node-xlsx');
const path = require('path')
const fs = require('fs')

class DataController extends BaseController {
  constructor() {
    super();
    _.isNumber()
  }

  async buildCartoonExcelData() {
    let cartoons = await CartoonService.all();
    let cartoonResponse = [["编号", "番名", "原番名", "追番人数", "评分人数", "评分"]]

    for(let cartoon of cartoons){
      cartoonResponse.push([cartoon.mid, cartoon.name, cartoon.originName, cartoon.fans, cartoon.ratingCount, cartoon.ratingCode])
    }

    return cartoonResponse;
  }

  async buildAllUperExcelData(){
    let upers = await UperService.all();
    let uperResponse = [["编号", "UP主", "等级", "签名", "投稿", "关注", "粉丝数"]]

    for(let uper of upers){
      uperResponse.push([uper.bid, uper.name, uper.level, uper.sign, uper.contribute, uper.attention,uper.fans])
    }

    return uperResponse;
  }

  async buildAttentionUperExcelData(){
    let upers = await AttentionService.findAndCountAll();
    let uperResponse = [["编号", "UP主", "等级", "签名", "投稿", "关注", "粉丝数"]]

    for(let uper of upers){
      uperResponse.push([uper.bid, uper.name, uper.level, uper.sign, uper.contribute, uper.attention,uper.fans])
    }

    return uperResponse;
  }

  async getUperInfo(bid){
    return await UperService.findByMid(bid);
  }

  async getUperDynamic(bid){
    return await DynamicService.findAll(bid)
  }

  async getUperVideo(bid){
    return await VideoService.findAll(bid)
  }

  async buildUpDynamicVideoExcelData(uper){
    let uperResponse = [["编号", "UP主", "等级", "签名", "投稿", "关注", "粉丝数"]]
    uperResponse.push([uper.bid , uper.name, uper.level, uper.sign, uper.contribute, uper.attention, uper.fans])
    uperResponse.push([null,null,null,null,null,null,null])

    let dynamics = await DynamicService.findAll(uper.bid)
    uperResponse.push([null,null,null,null,null,null,null])
    uperResponse.push([null,null,null,"动态",null,null,null])
    uperResponse.push([null,null,null,null,null,null,null])
    uperResponse.push(["编号", "类型", "标题", "描述", "内容", "动态", "转发", "评论", "点赞", "发布时间"])
    for(let dynamic of dynamics){
      uperResponse.push([dynamic.did, dynamic.type, dynamic.title ,dynamic.description, dynamic.content,dynamic.dynamic, dynamic.repost, dynamic.reply, dynamic.like, DateUtil.now(Date.parse(dynamic.ptime))])
    }

    let videos = await VideoService.findAll(uper.bid)
    uperResponse.push([null,null,null,null,null,null,null])
    uperResponse.push([null,null,null,"视频",null,null,null])
    uperResponse.push([null,null,null,null,null,null,null])
    uperResponse.push(["编号",  "标题", "币数",  "转发数", "评论数", "点赞数", "播放数", "弹幕数",  "发布时间", "描述", "作者"])
    for(let video of videos){
      uperResponse.push([video.aid, video.title, video.coin,video.share, video.comment,video.like, video.view, video.danmaku, DateUtil.now(Date.parse(video.ptime)), video.desc,video.author])
    }
    return uperResponse;
  }

  exportExcel() {
    return [
      this.query("type").exists(),
      this.query("length").optional(),
      this.query("bid").optional(),
      this.utils.checkValidationResult(),
      async (req, res, next) => {
        let {type, length} = req.query
        try {
          let data = null,sheet = "";
          switch (parseInt(type)){
            case 1:
              sheet = "番剧"
              data = await this.buildCartoonExcelData();
              break;
            case 2:
              sheet = "UP主"
              data = await this.buildAllUperExcelData();
              break;
            case 3:
              sheet = "UP主(关注)"
              data = await this.buildAttentionUperExcelData();
              break;
            case 4:
              let uper = await this.getUperInfo(req.query.bid);
              sheet = `UP主(${uper.name}})`
              data = await this.buildUpDynamicVideoExcelData(uper)
              break;
            default:
              data = [];
          }

          let buf = xlsx.build([{name: sheet, data: data}])
          let fileName = `${ DateUtil.yet()}(${sheet}).xlsx`;
          let fileResource = path.join(__dirname, ".." , "temp", fileName)
          fs.writeFileSync(fileResource, buf)

          // if (fu.isDirectory(filePath)) {
          //   res.set({
          //     'Content-Type': 'application/octet-stream',
          //     'Content-Disposition': 'attachment;fileName=' + fu.randomName() + '.zip'
          //   })
          //   fh.downloadFolderZip(filePath, fileName, res)
          // } else {
            let stats = fs.statSync(fileResource)
            res.set({
              'Content-Type': 'application/octet-stream',
              'Content-Disposition': 'attachment;fileName=' + encodeURI(fileName),
              'Content-Length': stats.size
            })
            fs.createReadStream(fileResource).pipe(res)
          // }
        } catch (err) {
          this.logger.error(err)
          this.systemInError(res)
        }
      }
    ]
  }

}

module.exports = new DataController();
