import Vue from 'vue'
import Vuex from 'vuex'
import API from '../lib/api'
import btc from './modules/btc'
import channels from './modules/channels'
import peers from './modules/peers'
import system from './modules/system'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

const getters = {
  info: state => state.info,
  balance: state => state.balance
}

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
    getters,
    actions,
    mutations,
    state: {
      info,
      balance: null
    },
    modules: {
      btc,
      channels,
      peers,
      system
    }
  })
