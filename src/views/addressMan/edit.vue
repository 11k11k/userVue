<template>
  <div>
    <van-nav-bar fixed :title="mode === 'edit' ? '地址修改' : '地址添加'" left-arrow @click-left="$router.go(-1)" />

    <van-address-edit :addressInfo="addressInfo" class="top" :area-list="areaList" show-postal:true show-delete :show-area=false
    show-set-default:true  show-search-result:true :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']"
      title="标题" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { Toast } from 'vant'
export default {
  name: 'EditName',
  created () {
    console.log('组件实例信息：', this)
    console.log('传递到组件的数据：', this.addressInfo)
  },
  mounted () {
    if (this.mode === 'edit') { this.dataList() }
  },
  data () {
    return {
      id: 1,
      addressInfo: {
        name: '',
        tel: '',
        addressDetail: ''
      },

      // name: '',
      // tel: 123,
      // province: '',
      // city: '',
      // country: '',
      // addressDetail: '',
      // idDefault: true,
      // 地区列表
      areaList,
      // 搜索列表
      searchResult: []

    }
  },
  computed: {
    mode () {
      return this.$route.query.mode
    }
  },
  methods: {

    dataList () {
      // 获取数据，将数据渲染到页面
      const item = this.$route.query.item
      const index = this.$route.query.index

      this.id = item[index].id
      this.addressInfo.name = item[index].name
      this.addressInfo.tel = item[index].tel
      this.addressInfo.addressDetail = item[index].address
    },
    onSave (content) {
      Toast('save')
      // this.addressInfo.name = content.name
      // this.addressInfo.tel = content.tel
      // this.addressInfo.address = content.address
      // console.log(this.AddressInfo)

      console.log(content.name)
      console.log(content)
    },
    onDelete () {
      Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}

</script>

<style scoped>
.top {
  padding-top: 46px;
}
</style>
