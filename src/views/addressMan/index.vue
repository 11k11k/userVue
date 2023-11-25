<template>
    <div>
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        add-button-text="新增地址"
        @add="onAdd"
        @edit="onEdit"
      />
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
import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'AddressMan',
  created () {
    console.log('selectAddress:', this.selectAddress)
    console.log('longAddress:', this.longAddress)
    this.dataListTwo()
  },
  mounted () {
    const id = this.$route.params.id
    const name = this.$route.params.name
    const tel = this.$route.params.tel

    // 确保数据不为 undefined，否则进行适当的处理
    if (id !== undefined && name !== undefined && tel !== undefined) {
    // 进行其他操作...
      console.log('shibai')
    }
  },
  data () {
    return {
      chosenAddressId: '1',
      list: [
        // {
        //   id: '1',
        //   name: '张三',
        //   tel: '13000000000',
        //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        // },

      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },

  computed: {
    ...mapState('addressName', ['AddressInfo']),
    selectAddress () {
      return this.$route.query.selectAddress
    },
    longAddress () {
      return this.$route.query.longAddress
    }
  },
  methods: {

    onAdd () {
      Toast('新增地址')
    },

    onEdit (item, index) {
      this.$router.push('/edit')
      Toast('编辑地址:' + index)
    },
    dataListTwo () {
      this.list = [{
        id: this.selectAddress.address_id,
        name: this.selectAddress.name,
        tel: this.selectAddress.phone,
        address: this.longAddress
      }
      ]
      if (this.isValidDataStructure(this.list)) {
        // 使用 Vuex 的 commit 方法触发 mutation
        this.$store.commit('addressName/getAddressData', this.list)
      } else {
        console.error('Invalid data structure for getAddressData mutation.')
      }
      // this.$store.commit('addressName/getAddressData', this.list)
      this.$nextTick(() => {
        console.log(this.list)
        console.log(this.AddressInfo)
        this.list = this.AddressInfo
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
    }
  }

}
</script>

<style lang="scss" scoped></style>
