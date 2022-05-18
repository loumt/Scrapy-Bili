import {
  getEmoji,
  removeEmoji,
  addEmoji,
  findEmojiWithOption
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
    },
    initPageData(state) {
      state.page = 1;
      state.limit = 10
    }
  },
  actions: {
    async getEmojiList({commit,state}){
      let res = await getEmoji(state.page,state.limit);
      commit('setEmojiList',res.data)
    },
    async removeEmoji({commit,state},id){
      await removeEmoji(id);
    },
    async createNewEmoji({commit, state}, {key, url}) {
      await addEmoji({key,url});
    },
    async findEmojiWithKeyPart({commit, state}, keyPart) {
      commit("initPageData")
      let res = await findEmojiWithOption(state.page,state.limit, keyPart)
      commit('setEmojiList',res.data)
    }
  }
}
