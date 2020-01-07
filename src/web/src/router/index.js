import Vue from 'vue'
import Router from 'vue-router'

//Layout
import LayoutDefault from '@/layouts/LayoutDefault'

// Main Container
import UpListModel from '@/components/UpListModel'
import CartoonListModel from '@/components/CartoonListModel'
import CartoonSearchModel from '@/components/CartoonSearchModel'
import UpSearchModel from '@/components/UpSearchModel'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

const router = [
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
      }
    ]
  }
]

export default new Router({
  routes: router
})
