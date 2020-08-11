import {
  getPermissionList,
  removeThisPermission
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
    setPermissionList(state,v) {
      state.rows=  v.rows;
      state.total=  v.count;
    },
    setPage(state, v) {
      state.page = v
    }
  },
  actions: {
    async getPermissions({commit,state}){
      let res = await getPermissionList(state.page,state.limit);
      commit('setPermissionList',res.data)
    },
    async deletePermission({commit,state},id){
      await removeThisPermission(id);
    }
  }
}
