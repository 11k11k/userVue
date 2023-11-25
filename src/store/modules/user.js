import { setLocal, getLocal } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getLocal()
    }
  },
  mutations: {
    getUserData (state, obj) {
      state.userInfo = obj
      setLocal(obj)
    }

  },
  getters: {

  },
  actions: {
    logout (context) {
      context.commit('getUserData', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
