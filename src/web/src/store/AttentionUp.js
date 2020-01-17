import {
  getUpList,
  cancelAttentionUp,
  getUpDynamicList,
  getUpVideoList
} from './../service/getData'

import emojiUtil from '../plugins/emijiUtil'

export default {
  namespaced: true,
  state: {
    options: [
    {
      value: 0,
      label: '粉丝数级别(默认全部)'
    }, {
      value: 1,
      label: '一万以下'
    }, {
      value: 2,
      label: '五万以下'
    }, {
      value: 3,
      label: '十万以下'
    }, {
      value: 4,
      label: '五十万以下'
    }, {
      value: 5,
      label: '五十万至一百万'
    }, {
      value: 6,
      label: '一百万以上'
    }, {
      value: 7,
      label: '一千万以上'
    }],
    rows: [],
    total: 0,
    limit : 10,
    page : 1,
    dynamicList: [],
    dynamicTotal: 0,
    videoList: []
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
    dynamicList(state,v) {
      state.dynamicTotal = v.total;
      state.dynamicList = [];
      v.rows.forEach(row => {
        if(row.type === 1) {
          row.content = emojiUtil(row.content)
        }
        if(row.type === 4) {
          row.content = emojiUtil(row.content)
        }
        if(row.type === 256) {
          row.content = emojiUtil(row.content)
        }
        if(row.type === 2) {
          row.description = emojiUtil(row.description)
        }
        if(row.type === 64) {
          row.dynamic = emojiUtil(row.dynamic)
        }
        if(row.type === 8) {
          row.dynamic = emojiUtil(row.dynamic)
          row.dynamic += `<a target="_blank" class="dynamic-link" href="https://www.bilibili.com/video/av${row.dynamic.aid}" title="${row.dynamic.title}">#视频#</a>`
        }
        state.dynamicList.push(row)
      })
    },
    videoList(state,v) {
      state.videoList = v.rows
    },
    setPage(state,v){
      state.page = v
    }
  },
  actions: {
    async getAttentionUpList({commit, state}, {upId,upName,fanMountLevel}) {
      let res = await getUpList(state.page,state.limit, upId, upName, fanMountLevel);
      commit('attentionList', res.data)
    },
    async cancelAttention({commit,state}, id){
      await cancelAttentionUp(id);
    },
    async refreshUpDynamic ({commit,state}, up) {
      let res = await getUpDynamicList(up.bid);
      commit('dynamicList', res.data)
    },
    async refreshUpVideo ({commit, state}, up) {
      let res = await getUpVideoList(up.bid);
      commit('videoList', res.data)
    }
  }
}
