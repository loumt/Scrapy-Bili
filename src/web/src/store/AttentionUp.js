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
    limit: 10,
    page: 1,
    dynamicList: [],
    dynamicTotal: 0,
    videoList: [],
    dataTableProps: {
      page: 1,
      limit: 20,
      type: '',
      bid: ''
    },
    showLoadMore: true
  },
  mutations: {
    attentionList(state, v) {
      v.rows.forEach(item => {
        if (item.face) {
          item.face = `https://images.weserv.nl/?url=` + item.face
        }
      })
      state.rows = v.rows;
      state.total = v.count;
      state.limit = v.limit;
      state.page = v.page;
    },
    dynamicList(state, v) {
      state.dynamicTotal = v.total;
      v.rows.forEach(row => {
        if (row.type === 1) {
          row.content = emojiUtil(row.content)
        }
        if (row.type === 4) {
          row.content = emojiUtil(row.content)
        }
        if (row.type === 256) {
          row.content = emojiUtil(row.content)
        }
        if (row.type === 2) {
          row.description = emojiUtil(row.description)
        }
        if (row.type === 64) {
          row.dynamic = emojiUtil(row.dynamic)
        }
        if (row.type === 8) {
          row.dynamic = emojiUtil(row.dynamic)
          row.dynamic += `<a target="_blank" class="dynamic-link" href="https://www.bilibili.com/video/av${row.dynamic.aid}" title="${row.dynamic.title}">#视频#</a>`
        }
      })
      if(state.dynamicList.length > 0) {
        state.dynamicList = state.dynamicList.concat(v.rows);
      }else{
        state.dynamicList = v.rows;
      }

      state.showLoadMore = !(state.dynamicList.length === v.total)
    },
    videoList(state, v) {
      if(state.videoList.length > 0) {
        state.videoList = state.videoList.concat(v.rows);
      }else{
        state.videoList = v.rows;
      }

      state.showLoadMore = !(state.videoList.length === v.total)
    },
    setPage(state, v) {
      state.page = v
    },
    initPageOptions(state, data) {
      state.page = data && data.page ? data.page : 1
      state.limit = data && data.limit ? data.limit : 20
      state.dynamicList = [];
      state.videoList = [];
    },
    setDataTableProps(state, v) {
      if(v.bid && v.type) {
        state.dataTableProps.bid = v.bid;
        state.dataTableProps.type = v.type;
      }
      state.dataTableProps.page = v.page || 1;
      state.dataTableProps.limit = v.limit || 20;
    },
    initDataTableProps(state, v) {
      state.dataTableProps.bid = '';
      state.dataTableProps.type = '';
      state.dataTableProps.page = 1;
      state.dataTableProps.limit = 10;
      state.dynamicList = [];
      state.videoList = [];
      state.loadMoreBtnShow = true
    }
  },
  actions: {
    async getAttentionUpList({commit, state}, {upId, upName, fanMountLevel}) {
      let res = await getUpList(state.page, state.limit, upId, upName, fanMountLevel);
      commit('attentionList', res.data)
    },
    async cancelAttention({commit, state}, id) {
      await cancelAttentionUp(id);
    },
    async refreshUpDynamic({commit, state}, up) {
      commit('setDataTableProps',{bid: up.bid, type: 1})
      let res = await getUpDynamicList(up.bid, state.dataTableProps);
      commit('dynamicList', res.data)
    },
    async refreshUpVideo({commit, state}, up) {
      commit('setDataTableProps',{bid: up.bid, type: 2})
      let res = await getUpVideoList(up.bid, state.dataTableProps);
      commit('videoList', res.data)
    },
    async loadNextDataList({commit, state}){
      if(state.dataTableProps.type === 1){
        let page = state.dataTableProps.page + 1;
        commit('setDataTableProps', { page })
        let res = await getUpDynamicList(state.dataTableProps.bid, state.dataTableProps);
        commit('dynamicList', res.data)
      }

      if(state.dataTableProps.type === 2){
        let page = state.dataTableProps.page + 1 ;
        commit('setDataTableProps', { page })
        let res = await getUpVideoList(state.dataTableProps.bid, state.dataTableProps);
        commit('videoList', res.data)
      }
    }
  }
}
