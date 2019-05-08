/* eslint-disable no-console */
import Vue from 'vue'
import VueSocket from 'vue-native-websocket'
import Clipboard from 'clipboard'
import router from './router'
import createStore from './store'
import App from './vue/App'
import API from './lib/api'
import './lib/registerServiceWorker'

Vue.config.productionTip = false

const mount = '#app'

// Automatic Global Registration of Base Components
// https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
const requireComponent = require.context('./vue/components', false, /Form[A-Z]\w+\.(vue|js)$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

  Vue.component(componentName, componentConfig.default || componentConfig)
});

// Load info via API, if that works init the app
(async () => {
  try {
    const { data: info } = await API.get('lnd/info')
    const initialState = { lnd: { state: { info } } }
    const store = createStore(initialState)
    const wsSocketUrl = `ws://${window.location.hostname}:${process.env.VUE_APP_SOCKET_PORT}`

    Vue.use(VueSocket, wsSocketUrl, { store: store, format: 'json' })

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount(mount)

    new Clipboard('[data-clipboard-text]')
      .on('error', event => {
        console.error('Clipboard error:', event)
      })
  } catch (error) {
    console.error(error)
    document.querySelector(mount).innerHTML = `Could not initialize app: Fetching data failed.`
  }
})()
