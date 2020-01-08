import {getCartoonHistoryList} from './../service/getData'

export default {
  namespaced: true,
  state: {
    histories: [],
    cartoon: {
      activity: {head_bg_url: "", id: 95, title: "17部国产动画闹新春！"},
      actors: "郝仁：风袖↵薇薇安：冯骏骅↵刘莉莉：V17-苏婉↵渡鸦12345：龟娘↵数据终端：沈达威↵南宫三八：谢添天↵伊扎克斯：夏磊↵南宫五月：V17-醋醋",
      alias: "异常,异闻录",
      areas: [{id: 1, name: "中国大陆"}],
      copyright: {is_finish: 1, is_started: 1},
      cover: "https://images.weserv.nl/?url=http://i0.hdslb.com/bfs/bangumi/cc393610a9ce2574260b0dee9978e05c460cd7e7.jpg",
      episode_index: {id: 282466, index: "13", index_show: "全13话", is_new: 0, play_index_show: ""},
      evaluate: "在普通的北方小城，23岁左右没有工作没有女朋友的普通人类郝仁，迫于生活压力出租老宅。在偶然接收了一个神经大条、行为奇怪的房客莉莉后，又遇到了同样奇怪的薇薇安，接着又鬼使神差的入职于管理宇宙秩序的希灵帝国时空管理局，接管各类来自外星球宇宙的异类生物，为各种类型的特殊访客提供住宿。逗逼的日常故事展开在房东郝仁和他的各种奇怪房客之间，他们在浩瀚的宇宙中旅行，遭遇各种智慧生物，卷入各种奇怪的事件。",
      long_review: {next: 80577881487435, normal: 305, total: 305, count: 305},
      media_id: 4313642,
      mode: 0,
      origin_name: "异常生物见闻录",
      payment: {discount: 100},
      publish: {is_finish: 1, is_started: 1, pub_date: "2019-06-28", pub_date_show: ""},
      rating: {count: 23756, score: 3.7},
      rights: {allow_bp: 0, allow_bp_rank: 0, allow_review: 1, can_watch: 1, copyright: "bilibili"},
      season_id: 26191,
      season_status: 13,
      seasons: [{is_new: 0, media_id: 4313642, season_id: 26191, season_title: "第一季", title: "异常生物见闻录", type: 4}],
      short_review: {next: 79083240410198, total: 15552},
      staff: "原作：远瞳↵导演：深蓝人↵编剧：熊兴智↵配音：音熊联萌↵音乐制作：MAGES.↵制作公司：上海童园文化传媒有限公司↵动画制作：北京漫漫淘科技有限公司↵美术设定：童园创意股份有限公司↵",
      stat: {danmakus: 309239, favorites: 1045508, series_follow: 1045496, views: 20715094},
      styles: [{id: 10012, name: "小说改"}, {id: 10021, name: "搞笑"}, {id: 10022, name: "日常"}, {id: 10023, name: "科幻"}],
      time_length: 0,
      title: "异常生物见闻录",
      type: 4,
      type_name: "国创"
    }
  },
  mutations: {
    setRows(state, v) {
      state.histories = v;
    }
  },
  actions: {
    async actionCartoonHistoryList({commit, state}) {
      let res = await getCartoonHistoryList(state.page, state.limit);
      commit('setRows', res.data)
    }
  }
}
