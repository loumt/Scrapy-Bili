import {attentionCartoon, getCartoon, getCartoonHistoryList} from './../service/getData'

export default {
  namespaced: true,
  state: {
    histories: [],
    showDetailModel: false,
    cartoon: {},
    isAttention: false
  },
  mutations: {
    setHistories(state, v) {
      state.histories = v;
    },
    setCartoon(state, v) {
      state.showDetailModel = true;
      state.cartoon = {
        pic: v.cover ? v.cover : "",
        cover: v.cover ? "https://images.weserv.nl/?url=" + v.cover : "",
        actors: v.actors,
        title: v.title,
        mid: v.media_id,
        origin_name: v.origin_name,
        favorites: v.stat.favorites,
        danmakus: v.stat.danmakus,
        views: v.stat.views,
        release_date_show: v.publish.release_date_show,
        time_length_show: v.publish.time_length_show,
        type_name: v.type_name,
        evaluate: v.evaluate
      }

      //不一定都有评分
      if (v.rating) {
        state.cartoon.rating = {
          score: v.rating.score,
          count: v.rating.count
        }
      }

      if (v.publish) {
        state.cartoon.release_date_show = v.publish.release_date_show;
        state.cartoon.time_length_show = v.publish.time_length_show;
      }

      state.isAttention = v.isAttention
    },
    setIsAttention(state, v) {
      state.isAttention = v
    }
  },
  actions: {
    async actionCartoonHistoryList({commit, state}) {
      let res = await getCartoonHistoryList(state.page, state.limit);
      commit('setHistories', res.data)
    },
    async findCartoonRemoteById({commit}, cId) {
      let res = await getCartoon(cId);
      commit('setCartoon', res.data)
    },
    async addToAttention({commit, state}) {
      let data = {
        mid: state.cartoon.mid,
        name: state.cartoon.title,
        originName: state.cartoon.origin_name,
        banner: state.cartoon.pic,
        fans: state.cartoon.favorites
      }

      //不一定都有评分
      if (state.cartoon.rating) {
        data.ratingCode = state.cartoon.rating.score;
        data.ratingCount = state.cartoon.rating.count;
      }
      await attentionCartoon(data);
    }
  }
}
