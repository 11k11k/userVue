import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000

})
// const jsonApi = axios.create({
//   baseURL: 'http://localhost:3000/',
//   timeout: 5000
// })

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  // 只要有token,就在请求的时候携带，便于请求需要授权的接口
  const token = store.getters.getToken
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 返回错误提示
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 清除loading
    Toast.clear()
  }
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  return Promise.reject(error)
})

// // 添加请求拦截器
// jsonApi.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   Toast.loading({
//     message: '加载中...',
//     forbidClick: true,
//     loadingType: 'spinner',
//     duration: 0
//   })
//   // 只要有token,就在请求的时候携带，便于请求需要授权的接口
//   const token = store.getters.getToken
//   if (token) {
//     config.headers['Access-Token'] = token
//     config.headers.platform = 'H5'
//   }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器
// jsonApi.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   const res = response.data
//   if (res.status !== 200) {
//     // 返回错误提示
//     Toast(res.message)
//     return Promise.reject(res.message)
//   } else {
//     // 清除loading
//     Toast.clear()
//   }
//   return response.data
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么

//   return Promise.reject(error)
// })
export default instance
