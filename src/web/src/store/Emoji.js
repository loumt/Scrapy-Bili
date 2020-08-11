import {
  getEmoji,
  removeEmoji
} from './../service/getData'

export default {
  namespaced: true,
  state: {
    rows:[],
    total: 0,
    limit: 10,
    page: 1
  },
  mutations: {
    setEmojiList(state,v) {
      state.rows=  v.rows;
      state.total=  v.count;
    },
    setPage(state, v) {
      state.page = v
    }
  },
  actions: {
    async getEmojiList({commit,state}){
      let res = await getEmoji(state.page,state.limit);
      commit('setEmojiList',res.data)
    },
    async removeEmoji({commit,state},id){
      await removeEmoji(id);
    }
  }
}
