module.exports = {
  UP_INFO : {
    url: "https://api.bilibili.com/x/space/acc/info?mid=#MID#&jsonp=jsonp",
    comment: "可以获取(昵称,等级,签名)"
  },
  UP_FOLLOW: {
    url: "https://api.bilibili.com/x/relation/stat?vmid=#MID#&jsonp=jsonp",
    comment: "获取(关注数,粉丝数目),这里callback=__jp4可以去除，但是为了不出现意外，一律按照浏览器方式去访问",
  },
  PLAY_COUNT: {
    url: "https://api.bilibili.com/x/space/upstat?mid=#MID#&jsonp=jsonp",
    comment : "获取(播放数目),原请求同样是__jpa5"
  },
  FOLLOW_DETAIL: {
    url: "https://api.bilibili.com/x/relation/followings?vmid=#MID#&pn=1&ps=20&order=desc&jsonp=jsonp",
    comment : "获取(关注详情),原请求同样是__jpa6"
  },
  CONTRIBUTE_DETAIL: {
    url: "https://api.bilibili.com/x/space/navnum?mid=#MID#&jsonp=jsonp",
    comment : "获取投稿数(视频,音频,专栏,相簿),原请求同样是__jpa10"
  },
  CARTOON_DETAIL:  {
    url: "https://api.bilibili.com/pgc/view/web/media?media_id=#MID#",
    comment : "获取番剧的追番人数,评分,评分人数"
  },
  UPER_DYNAMIC_DETAIL: {
    url: "https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?visitor_uid=0&host_uid=#MID#&offset_dynamic_id=0",
    comment: "获取Uper主动态"
  },
  VIDEO: {
    url: "https://api.bilibili.com/x/space/arc/search?mid=#BID#&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp",
    comment: "获取发布的视频列表"
  },
  VIDEO_DETAIL:{
    url:"https://api.bilibili.com/x/web-interface/view?aid=#AID#",
    comment: "获取视频的点赞转发评论投币数量"
  },
  FIND_EMOJI_LIST:{
    url: "https://api.bilibili.com/x/emote/user/panel/web?business=reply",
    comment: "获取表情列表"
  }
}