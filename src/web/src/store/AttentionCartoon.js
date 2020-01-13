import {
  getCartoonList,cancelAttentionCartoon
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
    cartoonList(state, v) {
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
    async getAttentionCartoonList({commit, state}, {cId,cName,scoreLevel,fanMountLevel}) {
      let res = await getCartoonList(state.page,state.limit, cId, cName, scoreLevel, fanMountLevel);
      commit('cartoonList', res.data)
    },
    async cancelAttention({},id){
      await cancelAttentionCartoon(id);
    }
  }
}
