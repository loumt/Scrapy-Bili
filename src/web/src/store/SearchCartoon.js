import {
  getCartoonHistoryList
} from './../service/getData'

export default {
  namespaced: true,
  state: {
    histories: []
  },
  mutations: {
    setRows(state, v) {
      state.histories = v;
    }
  },
  actions: {
    async actionCartoonHistoryList({commit, state}) {
      let res = await getCartoonHistoryList(state.page,state.limit);
      commit('setRows', res.data)
    }
  }
}
