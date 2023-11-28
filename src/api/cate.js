import request from '@/utils/request'
import req from '@/utils/jsonApi'
export const getCate = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {

    goodsId,
    goodsNum,
    goodsSkuId

  })
}
export const getCateList = () => {
  return req.get('/cartList')
}
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 删除购物车
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
