import { setAdd, getAdd } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      list: getAdd()
    }
  },
  mutations: {
    getAddressData (state, list) {
      if (Array.isArray(list) && list.length > 0) {
        const sampleItem = list[0]
        if (sampleItem && typeof sampleItem.id !== 'undefined' && typeof sampleItem.name !== 'undefined' && typeof sampleItem.tel !== 'undefined') {
          // 数据结构正确，进行赋值
          state.AddressInfo = list
          setAdd(list)
        } else {
          console.error('Invalid list structure for setListData mutation.')
        }
      } else {
        console.error('Invalid list format for setListData mutation.')
      }
    }
  }

}
