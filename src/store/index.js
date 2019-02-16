import Vue from 'vue'
import Vuex from 'vuex'
import peers from './modules/peers'
import system from './modules/system'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

const getters = {
  info: state => state.info
}

export default state =>
  new Vuex.Store({
    strict,
    state,
    getters,
    modules: {
      peers,
      system
    }
  })
