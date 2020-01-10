import axios from 'axios';
import Vue from 'vue';

let instance = axios.create({
  baseUrl: 'http://localhost:8181',
  timeout: 2000,
})

instance.interceptors.response.use(response => {
  return response
}, error => {
  //判断是否是标准的错误
  if(error.response) {
    let {data} = error.response;
    if(data) {
      Vue.prototype.$notify.error({title: '错误', message: data.message});
    }
  }
})

/**
 * 获取UP列表
 */
export const getUpList = (page,limit)=>{
  return instance.get(`/api/attention/upers?limit=${limit}&page=${page}`)
}

/**
 * 获取番剧列表
 */
export const getCartoonList = (page,limit)=>{
  return instance.get(`/api/attention/cartoons?limit=${limit}&page=${page}`)
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
