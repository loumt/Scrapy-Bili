
const UperTaskService = require('./../services/UperTaskService')
const UperService = require('./../services/UperService')
const AttentionService = require('./../services/AttentionService')
const CartoonService = require('./../services/CartoonService')
const VUperAttentionService = require('./../services/VUperAttentionService')
const DynamicService = require('./../services/DynamicService')
const DateUtil = require("./../utils/DateUtil")

async function test(){
  // await UperTaskService.deleteById(1)
  // await AttentionService.save({bid: 123})
  // let result  = await AttentionService.findAndCountAllWithInfo({ limit: 20, skip: 0})

  // await AttentionService.updateOne( {utime: new Date()},{where: {bid: 45024129}})

  // let rid = 29464974164710212;
  //        9223372036854775807
  // let rid = 10000000000000000;
  // let rid2 =38245830
  // let result = await DynamicService.findByDid(922337203685477);
  // console.dir(result)

  // console.dir(result)

  // await CartoonService.updateOne({fans: 11111}, {where:{id:1097} } )

  // let result = await CartoonService.nextTask();

  // console.dir(result.id)

  // let result = await DynamicService.findAll(408496784);
  //
  // for(let r of result){
  //   console.log(r.ptime)
    // console.log(r.ptime.toLocaleString())
    // console.log(r.ptime.toLocaleDateString())
    // console.log(r.ptime.toUTCString())
    // console.log(r.ptime.toISOString())
    // console.log(r.ptime.toTimeString())
    // console.log(r.ptime.toLocaleTimeString())
    // DateUtil.now()
  //   console.log(DateUtil.now(Date.parse(r.ptime)))
  // }

  let result = await UperService.findByMid(331257408);
  console.dir(result)

}

test()