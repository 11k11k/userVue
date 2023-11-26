<template>
  <div>
    <van-nav-bar fixed title="地址管理" left-arrow @click-left="$router.go(-1)" />

    <van-address-list  class='top' v-model="chosenAddressId" :list="list"
      add-button-text="新增地址" @add="onAdd" @edit="onEdit" />

    <!-- <div class="info">
            <div class="info-content">
              <span class="name">{{selectAddress.name}}</span>
              <span class="mobile">{{ selectAddress.phone }}</span>
            </div>
            <div class="info-address">
              {{ longAddress }}
            </div>
          </div> -->

  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { Toast } from 'vant'
import { getAddressList } from '@/api/address'
export default {
  name: 'AddressMan',
  created () {
    this.getAddressLists()
    this.test()
    // console.log('selectAddress:', this.selectAddress)
    // console.log('longAddress:', this.longAddress)
    // this.dataListTwo()
  },
  mounted () {
    // const id = this.$route.params.id
    // const name = this.$route.params.name
    // const tel = this.$route.params.tel

    // // 确保数据不为 undefined，否则进行适当的处理
    // if (id !== undefined && name !== undefined && tel !== undefined) {
    //   // 进行其他操作...
    //   console.log('shibai')
    // }
  },
  data () {
    return {

      chosenAddressId: '1',
      // 地址表
      list: [
        // {
        //   id: '1',
        //   name: '张三',
        //   tel: '13000000000',
        //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        //   isDefault: true
        // }
      ]
    }
  },

  computed: {
    // vuex里面的地址表
    // ...mapState('addressName', ['list']),
    // selectAddress () {
    //   return this.$route.query.selectAddress
    // },
    // longAddress () {
    //   return this.$route.query.longAddress
    // }
    // 地址相关信息
    selectAddress () {
      // const aList = this.list.slice(1, 10)
      // 返回数组的第一个元素，如果不存在则返回一个空对象
      // return aList.length > 0 ? aList[0] : {}
      return this.list || {}
    },
    // 地址详细信息拼接
    longAddress () {
      const region = this.selectAddress.region || {}
      return region.province + (region.city || '') + (region.region || '') + (this.selectAddress.detail || '')
    }
  },
  methods: {
    test () {
      console.log('sel')
      console.log(this.selectAddress)
      console.log('lon')
      console.log(this.longAddress)
    },
    onAdd () {
      Toast('新增地址')
      this.$router.push({
        path: '/edit',
        query: {
          mode: 'add'
        }
      })
    },

    onEdit (item, index) {
      Toast('编辑地址:' + index)
      this.$router.push({
        path: '/edit',
        query: {
          item: this.list,
          index: index,
          mode: 'edit'
        }
      })
    },
    dataListTwo () {
      this.addressList = [{
        id: this.selectAddress.address_id,
        name: this.selectAddress.name,
        tel: this.selectAddress.phone,
        address: this.longAddress
      }
      ]
      if (this.isValidDataStructure(this.addressList)) {
        // 使用 Vuex 的 commit 方法触发 mutation
        this.$store.commit('addressName/getAddressData', this.addressList)
      } else {
        console.log('Invalid list structure for getAddressData mutation.')
      }
      // this.$store.commit('addressName/getAddressData', this.list)
      this.$nextTick(() => {
        console.log(this.addressList)
        console.log(this.list)
        this.addressList = this.list
      })
    },
    isValidDataStructure (data) {
      // 进行数据结构检查，确保符合期望的结构
      return (
        Array.isArray(data) &&
        data.length > 0 &&
        typeof data[0].id !== 'undefined' &&
        typeof data[0].name !== 'undefined' &&
        typeof data[0].tel !== 'undefined'
      )
    },
    // 获取地址信息，赋值给list
    async getAddressLists () {
      const { data: { list } } = await getAddressList()
      // console.log(list)
      console.log('list')
      console.log(list)

      this.list = list.map(item => ({
        ...item,
        id: item.address_id,
        name: item.name,
        tel: item.phone,
        address: item.region.city + item.region.province + item.region.region + item.detail
      }))

      console.log('this.list')
      console.log(this.list)
    }
  }

}
</script>

<style scoped>
.top{
  padding-top: 46px;
}
</style>
