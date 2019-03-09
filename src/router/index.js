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
      component: () => import(/* webpackChunkName: "home" */ '../vue/pages/Home.vue')
    },
    {
      path: '/peers',
      name: 'peers',
      component: () => import(/* webpackChunkName: "peers" */ '../vue/pages/Peers.vue')
    },
    {
      path: '/channels',
      name: 'channels',
      component: () => import(/* webpackChunkName: "channels" */ '../vue/pages/Channels.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import(/* webpackChunkName: "tools" */ '../vue/pages/Tools.vue')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import(/* webpackChunkName: "system" */ '../vue/pages/System.vue')
    }
  ]
})
