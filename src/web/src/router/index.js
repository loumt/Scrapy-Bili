import Vue from 'vue'
import Router from 'vue-router'

//Layout
import LayoutDefault from '@/layouts/LayoutDefault'

// Main Container
import Uper from '@/components/Uper'
import Cartoon from '@/components/Cartoon'

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
        component: Cartoon
      },
      {
        path: '/attention/up',
        name: "attention_up",
        component: Uper
      }
    ]
  }
]

export default new Router({
  routes: router
})
