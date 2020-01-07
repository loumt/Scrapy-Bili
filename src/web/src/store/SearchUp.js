import {
  getUpHistoryList
} from './../service/getData'

export default {
  namespaced: true,
  state: {
    histories: [],
    person: {
      bid: 1351379,
      face: "https://images.weserv.nl/?url=http://i2.hdslb.com/bfs/face/f3776594fc0ff076bdfcc8fc4921327239a7150e.jpg",
      level: 6,
      name: "赫萝老师",
      sign: "我是小唇膏。有事请发新浪微博@赫萝老师"
    }
  },
  mutations: {
    setRows(state, v) {
      if(v.face){
        state.person.face = `https://images.weserv.nl/?url=` + v.face
      }
      state.person.bid = v.bid;
      state.person.level = v.level;
      state.person.name = v.name;
      state.person.sign = v.sign;
    },
    setRows(state, v) {
      state.histories = v;
    }
  },
  actions: {
    async actionUpHistoryList({commit, state}) {
      let res = await getUpHistoryList(state.page,state.limit);
      commit('setRows', res.data)
    }
  }
}
