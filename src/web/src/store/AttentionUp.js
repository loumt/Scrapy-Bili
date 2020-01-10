import {
  getUpList,
  cancelAttentionUp
} from './../service/getData'

export default {
  namespaced: true,
  state: {
    rows: [],
    total: 0,
    limit : 10,
    page : 1,
  },
  mutations: {
    attentionList(state, v) {
      v.rows.forEach(item=>{
        if(item.face){
          item.face = `https://images.weserv.nl/?url=` + item.face
        }
      })
      state.rows = v.rows;
      state.total = v.count;
      state.limit = v.limit;
      state.page = v.page;
    },
    setPage(state,v){
      state.page = v
    }
  },
  actions: {
    async getAttentionUpList({commit, state}) {
      let res = await getUpList(state.page,state.limit);
      commit('attentionList', res.data)
    },
    async cancelAttention({commit,state}, id){
      await cancelAttentionUp(id);
    }
  }
}
