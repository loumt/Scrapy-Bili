export default {
  state: {
    rows: [],
    total: 0,
    limit : 10,
    page : 1,
  },
  mutations: {
    setRows(state, v) {
      v.rows.forEach(item=>{
        item.face = `https://images.weserv.nl/?url=` + item.face
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
  getters: {
    getRows: state => {
      return state.rows
    }
  },
  actions: {
    getAttentionUpList({commit, state}, {thiz}) {
      thiz.$http.get(`/api/attention/upers?limit=${state.limit}&page=${state.page}`).then(res => {
        commit('setRows', res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
