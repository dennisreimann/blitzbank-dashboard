import Vue from 'vue'
import Vuex from 'vuex'
import merge from 'deepmerge'
import btc from './modules/btc'
import lnd from './modules/lnd'
import addresses from './modules/addresses'
import channels from './modules/channels'
import peers from './modules/peers'
import system from './modules/system'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

export default initial =>
  new Vuex.Store({
    strict,
    modules: merge({
      addresses,
      btc,
      channels,
      lnd,
      peers,
      system
    }, initial)
  })
