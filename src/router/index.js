import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/index.vue'
import Category from '@/views/layout/category.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'
import Cart from '@/views/layout/cart.vue'
import Edit from '@/views/addressMan/edit.vue'

// const store = () => import('@/store')
import store from '@/store'

const Login = () => import('@/views/login/index.vue')
const SearchList = () => import('@/views/search/list.vue')
const Myorder = () => import('@/views/myorder/index.vue')
const Prodetail = () => import('@/views/prodetail/index.vue')
const Search = () => import('@/views/search/index.vue')
const Pay = () => import('@/views/pay/index.vue')
const AddressMan = () => import('@/views/addressMan/index.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/home', component: Home },
        { path: '/user', component: User }
      ]
    },
    {
      path: '/myorder', component: Myorder
    },
    {
      path: '/pay', component: Pay
    },
    {
      path: '/prodetail/:id', component: Prodetail
    },
    {
      path: '/search', component: Search
    },
    { path: '/searchlist', component: SearchList },
    { path: '/addressMan', component: AddressMan },
    {
      path: '/edit', component: Edit
    }
  ]
})
const arr = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!arr.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.getToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
