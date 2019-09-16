import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
Router.prototype.animate = 0
// const _import_ = file => () => import('views/' + file + '.vue')

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['@/views/Layout/headerBar.vue'], resolve),
    redirect: '/home',
    children: [
      { path: 'home', component: resolve => require(['../views/Home/index.vue'], resolve), name: 'homepage' }
    ]
  },
  {
    path: '/shoppingcart',
    name: 'shoppingCart',
    component: resolve => require(['@/views/Shopping/ShoppingCart.vue'], resolve)
  }
]

export const router = new Router({
  routes: constantRouterMap
})
