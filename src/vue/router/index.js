import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const LOGIN_PATH = '/login'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../pages/Home')
    },
    {
      path: LOGIN_PATH,
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../pages/Login')
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

router.beforeEach((to, origin, next) => {
  if (to.path !== LOGIN_PATH && !store.getters.isAuthenticated) {
    next({ path: LOGIN_PATH })
  } else {
    next()
  }
})

export default router
