### B站爬虫V1

> 系统环境

```
 1.window7 
 2.node(v10.16.0)
 3.mysql 5.7以上
```

时间点: 2019-09-26 ~ 2019-10-08
项目: 一个服务(不可见爬虫,可见Web单页)

> 需求

```
UP主的页面的粉丝数/视频（投稿）数量; 
    https://space.bilibili.com/32708587/video

追番页面的追番人数/当前评分/评分人数;
    https://www.bilibili.com/bangumi/media/md23432/

指定动态/视频下的点赞、投币、评论、转发数量；(发布时间)
    https://www.bilibili.com/video/av40438440  视频
    https://space.bilibili.com/32708587/dynamic 动态

可设置每隔X小时自动抓取；
    Web服务

数据可导出EXL
    Web服务
```

```
1.模拟浏览器发送数据
    User-Agent:Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.
```



