import { getCateList, changeCount, delSelect } from '@/api/cate'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      // 让对应的id的项取返
      // console.log('toggleCheck mutation called for goodsId:', goodsId)
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      if (goods) {
        goods.isChecked = !goods.isChecked
        // console.log('isChecked toggled for goodsId:', goodsId)
      } else {
        console.error('Goods not found for goodsId:', goodsId)
      }
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    changeCounts (state, { goodsId, goodsNum }) {
      const obj = state.cartList.find(item => (item.goods_id === goodsId))
      obj.goods_num = goodsNum
    }
  },
  actions: {
    async getCateListData (context) {
      const { data } = await getCateList()
      data.list.forEach(item => {
        item.isChecked = true
      })

      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      context.commit('changeCounts', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')

      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCateListData')
    }
  },
  getters: {
    // 求所有的商品的累加数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品数
    selCartList (state) {
      // 返回数组中isChecked为true的值
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 是否全部选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
