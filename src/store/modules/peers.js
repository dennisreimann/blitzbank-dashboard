import API from '../../lib/api'
import Vue from 'vue'

const state = {
  peers: undefined
}

const actions = {
  async loadPeers ({ commit }) {
    const { data } = await API.get('lnd/peers')
    commit('setPeers', data)
  },

  async connectPeer ({ dispatch }, { addr }) {
    await API.post('lnd/peers', { addr })
    dispatch('loadPeers')
  },

  async disconnectPeer ({ dispatch }, { pubkey }) {
    await API.del(`lnd/peers/${pubkey}`)
    dispatch('loadPeers')
  }
}

const mutations = {
  setPeers (state, peers = []) {
    state.peers = peers
  },

  addMessageToPeer (state, { peer, message }) {
    Vue.set(peer, 'message', message)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
