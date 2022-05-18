import axios from 'axios';
import Vue from 'vue';
import router from './../router/index'

let instance = axios.create({
  baseUrl: 'http://localhost:8181',
  timeout: 1000,
})

instance.interceptors.request.use(config => {
  if(localStorage.getItem("BiliToken")){
    config.headers.Authorization = localStorage.getItem("BiliToken")
  }
  return config;
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  return response
}, error => {

  //判断是否是标准的错误
  if(error.response) {
    let {data, status} = error.response;

    if(status && status === 401) return router.push("/login")

    if(data) Vue.prototype.$notify.error({title: '错误', message: data.message})
  }
})

export const login = (username,password)=>{
  return instance.post(`/api/login`, {username,password})
}

export const logout = ()=>{
  return instance.post(`/api/logout`)
}


/**
 * 获取UP列表
 */
export const getUpList = (page,limit, upId,upName, fanMountLevel)=>{
  return instance.get(`/api/attention/upers?limit=${limit}&page=${page}&uperId=${upId}&uperName=${upName}&fanScope=${fanMountLevel}`)
}

/**
 * 获取番剧列表
 */
export const getCartoonList = (page,limit,cId,cName,scoreLevel,fanMountLevel)=>{
  let url = `/api/attention/cartoons?limit=${limit}&page=${page}&cartoonId=${cId}&cartoonName=${cName}&ratingScope=${scoreLevel}&fanScope=${fanMountLevel}`
  return instance.get(url)
}

/**
 * 获取UP历史查询列表
 */
export const getUpHistoryList = ()=>{
  return instance.get(`/api/search/history/2?limit=24`)
}

/**
 * 获取Cartoon历史查询列表
 */
export const getCartoonHistoryList = ()=>{
  return instance.get(`/api/search/history/1?limit=25`)
}

/**
 * 取消UP关注
 */
export const cancelAttentionUp = id=>{
  return instance.delete(`/api/attention/upers/` + id)
}

/**
 * 查询Up主信息
 * @param id
 * @return {Promise<AxiosResponse<T>>}
 */
export const remoteUpByUpId = id=> {
  return instance.get(`/api/search/uper/` + id)
}

/**
 * 添加Up主到番剧列表
 * @param bid
 * @param name
 * @return {Promise<AxiosResponse<T>>}
 */
export const attentionUpByUpId = (bid,name) => {
  return instance.post(`/api/attention/upers`, {bid,name})
}


/**
 * 取消关注番剧
 */
export const cancelAttentionCartoon = id =>{
  return instance.delete(`/api/attention/cartoons/` + id)
}

/**
 * 查询番剧
 * @param cId
 */
export const getCartoon = cId => {
  return instance.get(`/api/search/cartoon/` + cId)
}


/**
 * 添加该番剧
 * @param data
 */
export const attentionCartoon = data => {
  return instance.post(`/api/attention/cartoons`, data)
}

/**
 * 查询请求数
 * @param cId
 */
export const getLimit = () => {
  return instance.get(`/api/limit`)
}

/**
 * 获取Up主动态
 */
export const getUpDynamicList = (bid, {page,limit}) => {
  return instance.get("/api/attention/upers/" + bid +"/dynamics" + "?limit="+ limit +"&page=" + page)
}

/**
 * 获取Up主视频
 */
export const getUpVideoList = (bid, {page,limit}) => {
  return instance.get('/api/attention/upers/' + bid +"/videos"+ "?limit="+ limit +"&page=" + page)
}

/**
 * 查询表情列表
 */
export const getEmoji = (page,limit) => {
  return instance.get(`/api/emojis?page=` + page + `&limit=` + limit)
}


/**
 * 删除表情
 */
export const removeEmoji = id => {
  return instance.delete(`/api/emoji/` + id)
}


/**
 * 新增表情
 * @param key
 * @param url
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addEmoji = ({key,url}) => {
  return instance.post(`/api/emoji`, {key,url})
}

/**
 * 关键字查询
 */
export const findEmojiWithOption = (page =1 ,limit = 9999, keyPart) => {
  return instance.get(`/api/emojis?page=${page}&limit=${limit}&keyPart=${keyPart}`,)
}



/**
 * 查询用户列表
 */
export const getUserList = (page =1,limit = 9999) => {
  return instance.get(`/api/users?page=` + page + `&limit=` + limit)
}


/**
 * 删除用户
 */
export const removeUser = id => {
  return instance.delete(`/api/users/` + id)
}

/**
 * 新增用户
 * @param model
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addUser = model => {
  return instance.post(`/api/user`, model)
}

/**
 * 根据用户ID查询该用户的角色列表
 */
export const findRolesOfUser = ( userId , page = 1, limit = 9999 ) => {
  return instance.get(`/api/users/${userId}/roles?page=${page}&limit=${limit}`)
}

/**
 * 设置用户以角色
 */
export const setUserOfRoles = (userId,roleIds) => {
  return  instance.post(`/api/users/${userId}/roles`, {roleIds})
}


/**
 * 查询角色列表
 */
export const getRoleList = (page = 1 ,limit = 9999) => {
  return instance.get(`/api/roles?page=` + page + `&limit=` + limit)
}

/**
 * 设置角色以权限
 */
export const setRoleOfPermissions = (roleId, permissionIds) => {
  return  instance.post(`/api/roles/${roleId}/permissions`, {permissionIds})
}


/**
 * 删除角色
 */
export const removeRole = id => {
  return instance.delete(`/api/roles/` + id)
}


/**
 *  新增角色
 */

export const addRole = model => {
  return instance.post(`/api/role`, model)
}

/**
 * 获取角色的权限
 */
export const findPermissionsOfRole = ( roleId , page = 1, limit = 9999 ) => {
  return instance.get(`/api/roles/${roleId}/permissions?limit=${limit}&page=${page}`)
}


/**
 * 查询权限列表
 */
export const getPermissionList = (page =1 ,limit = 9999) => {
  return instance.get(`/api/permissions?page=` + page + `&limit=` + limit)
}

/**
 * 新增权限
 * @param model
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addPermission = model => {
  return instance.post(`/api/permission`, model)
}

/**
 * 更新权限
 * @param model
 * @returns {Promise<AxiosResponse<T>>}
 */
export const updatePermission = (id, disable) => {
  return instance.put(`/api/permission/${id}`, {disable})
}


/**
 * 删除权限
 */
export const removeThisPermission = id => {
  return instance.delete(`/api/permissions/` + id)
}

