import API from '../../lib/api'

const state = {
  activeChannels: undefined,
  pendingChannels: undefined,
  closedChannels: undefined
}

const actions = {
  async loadChannels ({ commit }) {
    const { data } = await API.get('lnd/channels')
    commit('setChannels', data)
  },

  async loadClosedChannels ({ commit }) {
    const { data } = await API.get('lnd/channels/closed')
    commit('setClosedChannels', data)
  },

  async openChannel ({ dispatch }, payload) {
    await API.post('lnd/channels', payload)
    dispatch('loadChannels')
  },

  async closeChannel ({ dispatch }, { id, ...payload }) {
    await API.del(`lnd/channels/${id}`, payload)
    dispatch('loadChannels')
    dispatch('loadClosedChannels')
  }
}

const mutations = {
  setChannels (state, { channels = [], pendingChannels = [] }) {
    state.activeChannels = channels
    state.pendingChannels = pendingChannels
  },

  setClosedChannels (state, { channels = [] }) {
    state.closedChannels = channels
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
