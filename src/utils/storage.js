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
  try {
    if (Array.isArray(list)) {
      // 将数据存储到本地存储
      localStorage.setItem(ADD_INFO, JSON.stringify(list))
      console.log('Data stored successfully:', list)
    } else {
      console.error('Invalid data format. Expected an array.')
    }
  } catch (error) {
    console.error('Error storing data to localStorage:', error)
  }
}
export const getAdd = () => {
  const defaultObj = []
  const res = localStorage.getItem(ADD_INFO)
  const jsonRes = JSON.parse(res)
  return res ? jsonRes : defaultObj
}
