const request = require('request')
const CommonURLConfigure = require('./../constants/CommonURLConfigure')

//用户信息
// let url = 'https://api.bilibili.com/x/space/acc/info?mid=3092063&jsonp=jsonp';
//关注数 粉丝数
// let url = 'https://api.bilibili.com/x/relation/stat?vmid=28496477&jsonp=jsonp';
//播放数
// let url = 'https://api.bilibili.com/x/space/upstat?mid=28496477&jsonp=jsonp';

// let url = "https://api.bilibili.com/x/relation/followings?vmid=28496477&pn=1&ps=20&order=desc&jsonp=jsonp"

let url = "https://api.bilibili.com/x/web-interface/view?aid=66760237"

request({
  url,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    // "Accept-Encoding": "gzip, deflate, br",
    // "Connection": "keep-alive",
    // "Referer": "https://space.bilibili.com/28496477/fans/follow",
    // "Host": "api.bilibili.com",
    // "Origin": "https://space.bilibili.com",
    // "Cookie": "LIVE_BUVID=AUTO4815249928340412; buvid3=B4273FF5-0532-4667-B4BE-01A93CB18B75101591infoc; fts=1532440540; stardustvideo=1; CURRENT_FNVAL=16; sid=6216hueu; LIVE_PLAYER_TYPE=2; rpdid=|(u|JRkuRYl)0J'ullm|m)~kk; CURRENT_QUALITY=0; _uuid=5D7EE696-07B0-E7FF-3B14-9A97733BA79362077infoc; UM_distinctid=16d6c56456acd-07d8bafde90718-58422116-1fa400-16d6c56456b7b8; bsource=seo_baidu"
  }
}, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  console.dir(JSON.parse(body))

  // let {list} = JSON.parse(body).data
  //
  // let result = list.map(item => {
  //   console.dir(item)
  //   return {
  //     bid: item.mid,
  //     name: uname,
  //   }
  // })
  // console.dir(result)
});