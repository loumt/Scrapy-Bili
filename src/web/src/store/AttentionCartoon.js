import {
  getCartoonList
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
    setRows(state, v) {
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
    async getAttentionCartoonList({commit, state}) {
      let res = await getCartoonList(state.page,state.limit);
      commit('setRows', res.data)
    }
  }
}
