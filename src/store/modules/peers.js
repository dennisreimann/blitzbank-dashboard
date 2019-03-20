import API from '../../lib/api'
import debounce from '../../lib/debounce'

const state = {
  peers: undefined
}

const actions = {
  async loadPeers ({ commit }) {
    const { data } = await API.get('lnd/peers')
    commit('setPeers', data)
  },

  async connectPeer (_, { addr }) {
    await API.post('lnd/peers', { addr })
    refreshPeers(this)
  },

  async disconnectPeer (_, { pubkey }) {
    await API.del(`lnd/peers/${pubkey}`)
    refreshPeers(this)
  }
}

const mutations = {
  setPeers (state, peers = []) {
    state.peers = peers
  }
}

export const refreshPeers = store => debounce('REFRESH_PEERS', () => {
  store.dispatch('peers/loadPeers')
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
