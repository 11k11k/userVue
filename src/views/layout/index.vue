<template>
    <div>
        <router-view></router-view>
        <van-tabbar route v-model="active" active-color="skyblue" inactive-color="#000">
            <van-tabbar-item to="/home" icon="records-o" badge="5">菜单</van-tabbar-item>
            <van-tabbar-item to="/category" icon="shop-o">分类页</van-tabbar-item>
            <van-tabbar-item to="/cart" icon="fire-o">餐桌</van-tabbar-item>

            <van-tabbar-item to="/user" icon="contact-o">我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
