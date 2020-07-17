const RequestHandler = require('./../utils/RequestHander')
const CommonURLConfigure =require('./../constants/CommonURLConfigure')
const utils = require('./../utils/utils')

// async function trest(){
//   let infoRes = await RequestHandler(CommonURLConfigure.CARTOON_DETAIL.url.replace("#MID#", "28221143"))
//
//   let info = utils.parse2Object(infoRes)
//   console.dir(info)
// }
// trest()


async function trest(){
  let infoRes = await RequestHandler(CommonURLConfigure.UP_INFO.url.replace("#MID#", "11073"))

  let info = utils.parse2Object(infoRes)
  console.dir(info)
}
trest()

