import axios from 'axios';

let instance = axios.create({
  timeout: 2000,
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
