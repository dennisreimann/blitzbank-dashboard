import Vue from 'vue'
import router from './router'
import createStore from './store'
import API from './api'
import App from './components/App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

const mount = '#app';

(async () => {
  try {
    const { data: info } = await API.get('lnd/info')
    new Vue({
      router,
      store: createStore({ info }),
      render: h => h(App)
    }).$mount(mount)
  } catch (error) {
    console.error(error)
    document.querySelector(mount).innerHTML = `Could not initialize app: Fetching data failed.`
  }
})()
