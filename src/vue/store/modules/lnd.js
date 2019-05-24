import API from '../../lib/api'
import debounce from '../../lib/debounce'

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

export const refreshBalance = store => debounce('REFRESH_BALANCE', () => {
  store.dispatch('lnd/loadBalance')
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
