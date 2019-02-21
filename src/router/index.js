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
      component: () => import(/* webpackChunkName: "home" */ '../vue/Home.vue')
    },
    {
      path: '/peers',
      name: 'peers',
      component: () => import(/* webpackChunkName: "peers" */ '../vue/Peers.vue')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import(/* webpackChunkName: "system" */ '../vue/System.vue')
    }
  ]
})
