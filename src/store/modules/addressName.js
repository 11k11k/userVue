import { setAdd, getAdd } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 获取本地存储的地址表
      list: getAdd()
    }
  },
  mutations: {
    getAddressData (state, list) {
      if (Array.isArray(list) && list.length > 0) {
        const sampleItem = list[0]
        if (sampleItem && typeof sampleItem.id !== 'undefined' && typeof sampleItem.name !== 'undefined' && typeof sampleItem.tel !== 'undefined') {
          // 数据结构正确，进行赋值
          state.list = list
          // 存储地址表到本地
          setAdd(list)
        } else {
          console.log('Invalid list structure for setListData mutation.')
        }
      } else {
        console.log('Invalid list format for setListData mutation.')
      }
    }
  }

}
