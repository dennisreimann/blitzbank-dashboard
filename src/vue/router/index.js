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
      component: () => import(/* webpackChunkName: "home" */ '../pages/Home')
    },
    {
      path: '/peers',
      name: 'peers',
      component: () => import(/* webpackChunkName: "peers" */ '../pages/Peers')
    },
    {
      path: '/channels',
      name: 'channels',
      component: () => import(/* webpackChunkName: "channels" */ '../pages/Channels')
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import(/* webpackChunkName: "invoices" */ '../pages/Invoices')
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import(/* webpackChunkName: "payments" */ '../pages/Payments')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import(/* webpackChunkName: "tools" */ '../pages/Tools')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import(/* webpackChunkName: "system" */ '../pages/System')
    }
  ]
})
