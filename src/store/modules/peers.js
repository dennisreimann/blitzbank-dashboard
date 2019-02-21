import API from '../../lib/api'

const state = {
  all: []
}

const getters = {
  all: state => state.all
}

const actions = {
  async all ({ commit }) {
    const { data: { peers } } = await API.get('lnd/peers')
    commit('setPeers', peers || [])
  },

  async connect ({ dispatch }, addr) {
    await API.post('lnd/peers', { addr })
    dispatch('all')
  },

  async remove ({ dispatch }, pubKey) {
    await API.del(`lnd/peers/${pubKey}`)
    dispatch('all')
  }
}

const mutations = {
  setPeers (state, peers) {
    state.all = peers
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
