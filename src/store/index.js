import Vue from 'vue'
import Vuex from 'vuex'
import API from '../lib/api'
import btc from './modules/btc'
import addresses from './modules/addresses'
import channels from './modules/channels'
import peers from './modules/peers'
import system from './modules/system'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

const actions = {
  async loadBalance ({ commit }) {
    const { data: balance } = await API.get('lnd/balance')
    commit('setBalance', balance)
  }
}

const mutations = {
  setBalance (state, balance) {
    state.balance = balance
  }
}

export default ({ info }) =>
  new Vuex.Store({
    strict,
    actions,
    mutations,
    state: {
      info,
      balance: undefined
    },
    modules: {
      addresses,
      btc,
      channels,
      peers,
      system
    }
  })
