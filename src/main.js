import Vue from 'vue'
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
    new Vue({
      router,
      store: createStore(initialState),
      render: h => h(App)
    }).$mount(mount)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    document.querySelector(mount).innerHTML = `Could not initialize app: Fetching data failed.`
  }
})()
