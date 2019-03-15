import API from '../../lib/api'

const state = {
  info: undefined,
  balance: undefined
}

const actions = {
  async loadInfo ({ commit }) {
    const { data: info } = await API.get('lnd/info')
    commit('setInfo', info)
  },

  async loadBalance ({ commit }) {
    const { data: balance } = await API.get('lnd/balance')
    commit('setBalance', balance)
  }
}

const mutations = {
  setInfo (state, info) {
    state.info = info
  },

  setBalance (state, balance) {
    state.balance = balance
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
