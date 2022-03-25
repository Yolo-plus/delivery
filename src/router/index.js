import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Login from '../pages/Login/Login'
// import Userinfo from '../pages/Profile/Userinfo'
// import Shop from '../pages/Shop/Shop'
// import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
// import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
// import Account from '../pages/Account/Account'
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Login = () => import('../pages/Login/Login')
const Userinfo = () => import('../pages/Profile/Userinfo')
const Shop = () => import('../pages/Shop/Shop')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods')
const ShopRatings = () => import('../pages/Shop/ShopRatings/ShopRatings')
const Account = () => import('../pages/Account/Account')

Vue.use(VueRouter)

const originaPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location) {
  return originaPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      // 注意：不应该把参数传递到Shop里面，因为会影响子路由的默认跳转
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods/:id',
          component: ShopGoods
        },
        {
          path: '/shop/ratings/:id',
          component: ShopRatings
        },
        {
          path: '/shop',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/userinfo/:userInfo',
      component: Userinfo
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/account/:u_name',
      component: Account
    }
  ]
})