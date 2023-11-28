// import request from '@/utils/request'
import request from '@/utils/jsonApi'
// 获取个人信息
export const getUserInfoDetail = () => {
  // return request.get('/user/info')
  return request.get('/user')
}
