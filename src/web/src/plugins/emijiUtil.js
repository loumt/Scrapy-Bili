const emojiList = [
  {
    key: '[妙啊]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/f8e9a59cad52ae1a19622805696a35f0a0d853f3.png@100w_100h.webp"/>'
  },
  {
    key: '[惊讶]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/b4cb77159d58614a9b787b91b1cd22a81f383535.png@100w_100h.webp"/>'
  },
  {
    key: '[微笑]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/bf3ea8541e1bd469255a907f7b60015ad9abf1ce.png@100w_100h.webp"/>'
  },
  {
    key: '[笑哭]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/c3043ba94babf824dea03ce500d0e73763bf4f40.png@100w_100h.webp"/>'
  },
  {
    key: '[滑稽]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/d15121545a99ac46774f1f4465b895fe2d1411c3.png@100w_100h.webp"/>'
  },
  {
    key: '[白眼]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/baiyan.png"/>'
  },
  {
    key: '[喵]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/miaozhan/miao.png"/>'
  },
  {
    key: '[腼腆]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/miantian.png"/>'
  },
  {
    key: '[doge]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/bba7c12aa51fed0199c241465560dfc2714c593e.png@100w_100h.webp"/>'
  },
  {
    key: '[傲娇]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/010540d0f61220a0db4922e4a679a1d8eca94f4e.png@100w_100h.webp"/>'
  },
  {
    key: '[妙啊]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/b4cb77159d58614a9b787b91b1cd22a81f383535.png@100w_100h.webp"/>'
  },
  {
    key: '[吃瓜]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/4191ce3c44c2b3df8fd97c33f85d3ab15f4f3c84.png@100w_100h.webp"/>'
  },
  {
    key: '[画风突变]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/ba4de7a3f97644038b15195bdc9f82a8fd118e77.png@100w_100h.webp"/>'
  },
  {
    key: '[惊讶]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/f8e9a59cad52ae1a19622805696a35f0a0d853f3.png@100w_100h.webp"/>'
  },
  {
    key: '[抠鼻]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/cb89184c97e3f6d50acfd7961c313ce50360d70f.png@100w_100h.webp"/>'
  },
  {
    key: '[无语]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/44667b7d9349957e903b1b62cb91fb9b13720f04.png@100w_100h.webp"/>'
  },
  {
    key: '[阴险]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/ba8d5f8e7d136d59aab52c40fd3b8a43419eb03c.png@100w_100h.webp"/>'
  },
  {
    key: '[酸了]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/92b1c8cbceea3ae0e8e32253ea414783e8ba7806.png@100w_100h.webp"/>'
  },
  {
    key: '[害羞]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/9d2ec4e1fbd6cb1b4d12d2bbbdd124ccb83ddfda.png@100w_100h.webp"/>'
  },
  {
    key: '[嫌弃]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/de4c0783aaa60ec03de0a2b90858927bfad7154b.png@100w_100h.webp"/>'
  },
  {
    key: '[生病]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/0f25ce04ae1d7baf98650986454c634f6612cb76.png@100w_100h.webp"/>'
  },
  {
    key: '[呆]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/33ad6000d9f9f168a0976bc60937786f239e5d8c.png@100w_100h.webp"/>'
  },
  {
    key: '[黑洞]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/e90ec4c799010f25391179118ccd9f66b3b279ba.png@100w_100h.webp"/>'
  },
  {
    key: '[喜欢]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/8a10a4d73a89f665feff3d46ca56e83dc68f9eb8.png@100w_100h.webp"/>'
  },
  {
    key: '[打call]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/431432c43da3ee5aab5b0e4f8931953e649e9975.png@100w_100h.webp"/>'
  },
  {
    key: '[奸笑]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/bb84906573472f0a84cebad1e9000eb6164a6f5a.png@100w_100h.webp"/>'
  },
  {
    key: '[捂脸]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/archive/6921bb43f0c634870b92f4a8ad41dada94a5296d.png"/>'
  },
  {
    key: '[惊喜]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/emote/0afecaf3a3499479af946f29749e1a6c285b6f65.png@100w_100h.webp"/>'
  },
  {
    key: '[难过]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/nanguo.png"/>'
  },
  {
    key: '[喜极而泣]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/archive/485a7e0c01c2d70707daae53bee4a9e2e31ef1ed.png"/>'
  },
  {
    key: '[tv_微笑]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/weixiao.png"/>'
  },
  {
    key: '[tv_doge]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/doge.png"/>'
  },
  {
    key: '[tv_大佬]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/dalao.png"/>'
  },
  {
    key: '[tv_点赞]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/dianzan.png"/>'
  },
  {
    key: '[tv_偷笑]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/touxiao.png"/>'
  },
  {
    key: '[tv_笑哭]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/xiaoku.png"/>'
  },
  {
    key: '[tv_馋]',
    emoji: '<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/chan.png"/>'
  }
];

function transFormEmoji(content) {
  if(content === '' || content === null) return content;

  for(var i=0;i< emojiList.length;i++) {
    let {key,emoji} = emojiList[i];
    content = content.split(key).join(emoji)
  }
  return content;
}


export default transFormEmoji;
