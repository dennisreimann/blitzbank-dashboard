import API from '../../lib/api'

const state = {
  activeChannels: undefined,
  pendingChannels: undefined
}

const actions = {
  async loadChannels ({ commit }) {
    const { data } = await API.get('lnd/channels')
    commit('setChannels', data)
  },

  async openChannel ({ dispatch }, payload) {
    await API.post('lnd/channels', payload)
    dispatch('loadChannels')
  }
}

const mutations = {
  setChannels (state, { channels = [], pendingChannels = [] }) {
    state.activeChannels = channels
    state.pendingChannels = pendingChannels
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
