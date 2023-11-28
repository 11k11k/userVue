import request from '@/utils/jsonApi'
// import request from '@/utils/request'
export const getAddressList = () => {
  // return request.get('/address/list')
  return request.get('/address')
}
