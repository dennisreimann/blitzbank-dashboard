import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../vue/pages/Home')
    },
    {
      path: '/peers',
      name: 'peers',
      component: () => import(/* webpackChunkName: "peers" */ '../vue/pages/Peers')
    },
    {
      path: '/channels',
      name: 'channels',
      component: () => import(/* webpackChunkName: "channels" */ '../vue/pages/Channels')
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import(/* webpackChunkName: "invoices" */ '../vue/pages/Invoices')
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import(/* webpackChunkName: "payments" */ '../vue/pages/Payments')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import(/* webpackChunkName: "tools" */ '../vue/pages/Tools')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import(/* webpackChunkName: "system" */ '../vue/pages/System')
    }
  ]
})
