import API from '../../lib/api'

const state = {
  blockchainInfo: undefined
}

const actions = {
  async loadBlockchainInfo ({ commit }) {
    const { data } = await API.get('btc/blockchaininfo')
    commit('setBlockchainInfo', data)
  }
}

const mutations = {
  setBlockchainInfo (state, info) {
    state.blockchainInfo = info
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
