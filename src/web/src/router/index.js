import Vue from 'vue'
import Router from 'vue-router'

//Layout
import LayoutDefault from '@/layouts/LayoutDefault'

// Main Container
import UpListModel from '@/components/UpListModel'
import CartoonListModel from '@/components/CartoonListModel'
import CartoonSearchModel from '@/components/CartoonSearchModel'
import UpSearchModel from '@/components/UpSearchModel'
import Export from '@/components/Export'
import Emoji from '@/components/Emoji'
import User from '@/components/User'
import Role from '@/components/Role'
import Permission from '@/components/Permission'
import Login from '@/components/Login'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

const router = [
  {
    path:'/login',
    component: Login
  },
  {
    path: '/',
    component: LayoutDefault,
    redirect: '/attention/up',
    children: [
      {
        path: '/attention/cartoon',
        name: "attention_cartoon",
        component: CartoonListModel
      },
      {
        path: '/attention/up',
        name: "attention_up",
        component: UpListModel
      },
      {
        path: '/search/cartoon',
        name: "search_cartoon",
        component: CartoonSearchModel
      },
      {
        path: '/search/up',
        name: "search_up",
        component: UpSearchModel
      },
      {
        path: '/export',
        name: "export",
        component: Export
      },
      {
        path: '/emoji',
        name: "emoji",
        component: Emoji
      },
      {
        path: '/user',
        name: "user",
        component: User
      },
      {
        path: '/role',
        name: "role",
        component: Role
      },
      {
        path: '/permission',
        name: "permission",
        component: Permission
      }
    ]
  }
]

let R = new Router({routes: router})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
R.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('BiliToken');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default R
