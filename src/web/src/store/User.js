import {
  getUserList,
  removeUser,
  addUser,
  getRoleList,
  findRolesOfUser,
  setUserOfRoles
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
    setUserList(state,v) {
      state.rows=  v.rows;
      state.total=  v.count;
    },
    setPage(state, v) {
      state.page = v
    }
  },
  actions: {
    async getUsers({commit,state}){
      let res = await getUserList(state.page,state.limit);
      commit('setUserList',res.data)
    },
    async deleteUser({commit,state},id){
      await removeUser(id);
    },
    async createNewUser({commit, state}, model) {
      await addUser(model);
    },
    async findUserRoles ({commit, state}, userId){
      return await findRolesOfUser(userId)
    },
    async findRoles ({commit, state}){
      return await getRoleList()
    },
    async distributeRoles ({commit, state}, {userId,roleIds}) {
      return await setUserOfRoles(userId, roleIds)
    }
  }
}
