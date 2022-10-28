import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1.安装插件
Vue.use(Router)

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showTab: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      showTab: true
    }
  },
  {
    path: '/shopcart',
    component: Shopcart,
    meta: {
      showTab: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showTab: true
    }
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new Router({
  routes,
  mode: 'history'
})

// 3.导出router
export default router
