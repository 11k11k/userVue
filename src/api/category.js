// import request from '@/utils/request'
import req from '@/utils/jsonApi'
export const getCategoryData = () => {
  // return request.get('/category/list')
  return req.get('/categoryList')
}
