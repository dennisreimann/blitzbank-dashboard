/* eslint-disable no-console */
import Vue from 'vue'
import VueSocket from 'vue-native-websocket'
import Clipboard from 'clipboard'
import router from './vue/router'
import store from './vue/store'
import App from './vue/App'
import './vue/lib/registerServiceWorker'

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
    await store.dispatch('checkSession')

    // FIXME: Remove the scheme once this gets merged and released:
    // https://github.com/nathantsoi/vue-native-websocket/pull/90
    const wsSocketUrl = `wss://${window.location.host}`

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
