import {
  addRole, findRolesOfUser,
  getRoleList,
  removeRole,
  findPermissionsOfRole,
  getPermissionList, setUserOfRoles,
  setRoleOfPermissions
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
    },
    async createRole({commit, state}, model) {
      await addRole(model);
    },
    async findRolePermissions ({commit, state}, roleId){
      return await findPermissionsOfRole(roleId)
    },
    async findPermissions ({commit, state}){
      return await getPermissionList()
    },
    async distributePermissions({commit, state}, {roleId,permissionIds}){
      return await setRoleOfPermissions(roleId, permissionIds)
    }
  }
}
