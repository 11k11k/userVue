const KEY_INFO = 'LocalToken'
const SEA_INFO = 'searchKey'
const ADD_INFO = 'addressKey'
export const setLocal = (obj) => {
  return localStorage.setItem(KEY_INFO, JSON.stringify(obj))
}
export const getLocal = () => {
  const defaultObj = {
    token: '',
    userId: ''
  }
  const res = localStorage.getItem(KEY_INFO)
  return res ? JSON.parse(res) : defaultObj
}
//
export const setSearch = (obj) => {
  return localStorage.setItem(SEA_INFO, JSON.stringify(obj))
}
export const getSearch = () => {
  const defaultObj = []
  const res = localStorage.getItem(SEA_INFO)
  const jsonRes = JSON.parse(res)
  return res ? jsonRes : defaultObj
}
// 地址管理

export const setAdd = (list) => {
  return localStorage.setItem(ADD_INFO, JSON.stringify(list))
}
export const getAdd = () => {
  const defaultObj = []
  const res = localStorage.getItem(ADD_INFO)
  const jsonRes = JSON.parse(res)
  return res ? jsonRes : defaultObj
}
