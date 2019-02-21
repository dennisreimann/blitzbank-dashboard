import API from '../../lib/api'

const state = {
  blockchainInfo: null
}

const getters = {
  blockchainInfo: state => state.blockchainInfo
}

const actions = {
  async blockchainInfo ({ commit }) {
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
  getters,
  actions,
  mutations
}
