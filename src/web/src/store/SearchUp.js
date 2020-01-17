import {
  getUpHistoryList,
  remoteUpByUpId,
  attentionUpByUpId
} from './../service/getData'

export default {
  namespaced: true,
  state: {
    histories: [],
    person: {},
    showDetailModel: false,
    isAttention : false
  },
  mutations: {
    setPerson(state, v) {
      state.showDetailModel = true;
      state.person = {
        face: v.face ? `https://images.weserv.nl/?url=` + v.face : "",
        bid: v.bid,
        name:v.name,
        level: v.level,
        sex: v.sex,
        sign: v.sign,
       }
      state.isAttention = v.isAttention
    },
    setFindHistories(state, v) {
      state.histories = v;
    },
    setIsAttention(state,v) {
      state.isAttention = v
    }
  },
  actions: {
    async actionUpHistoryList({commit,state}) {
      let res = await getUpHistoryList(state.page,state.limit);
      commit('setFindHistories', res.data)
    },
    async findUpRemoteById({commit}, upId){
      let res = await remoteUpByUpId(upId);
      commit("setPerson", res.data)
    },
    async addToUpAttention({}, {bid , name}) {
      await attentionUpByUpId(bid,name);
    }
  }
}
