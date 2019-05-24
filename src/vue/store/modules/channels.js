import API from '../../lib/api'
import debounce from '../../lib/debounce'

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

  async openChannel (_, payload) {
    await API.post('lnd/channels', payload)
    refreshChannels(this)
  },

  async closeChannel (_, { id, ...payload }) {
    await API.del(`lnd/channels/${id}`, payload)
    refreshChannels(this)
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

export const refreshChannels = store => debounce('REFRESH_CHANNELS', () => {
  store.dispatch('channels/loadChannels')
  store.dispatch('channels/loadClosedChannels')
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
