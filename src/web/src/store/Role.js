import {
  getRoleList,
  removeRole
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
    setRoleList(state,v) {
      state.rows=  v.rows;
      state.total=  v.count;
    },
    setPage(state, v) {
      state.page = v
    }
  },
  actions: {
    async getRoles({commit,state}){
      let res = await getRoleList(state.page,state.limit);
      commit('setRoleList',res.data)
    },
    async deleteRole({commit,state},id){
      await removeRole(id);
    }
  }
}
