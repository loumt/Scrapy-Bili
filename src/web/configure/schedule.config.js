module.exports = {
  //1.UP主获取定时器设置(30秒获取一个) ----- B站UP主
  UPER_SCHEDULE: '*/30 * * * * *',

  //2.关注项
  ATTENTION: {
    //番剧定时器设置 ------ 本站中已关注的番剧
    CARTOON: {
      //番剧信息定时器设置
      INFO_SHEDULE: '0 */2 * * * *'
    },
    //UP主更新项
    UPER: {
      //UP主信息定时器设置
      INFO_SHEDULE: "*/30 * * * * *",
      // 动态更新定时器设置
      DYNAMIC_SCHEDULE: '0 */1 * * * *',
      // 视频更新定时器设置
      VIDEO_SCHEDULE: '*/15 * * * * *'
    }
  }
}