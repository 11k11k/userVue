<template>

  <div>
    <van-nav-bar fixed title="菜品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-address-edit
    class="top"
    :area-list="areaList"
    show-postal:true
    show-delete:true
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    title="标题"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
  /></div>

</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'EditName',
  created () {
  },
  data () {
    return {
      areaList: {},
      searchResult: []

    }
  },
  methods: {
    onSave () {
      Toast('save')
      console.log(this.AddressInfo)
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
.top{
  padding-top: 46px;
}
</style>
