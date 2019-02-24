import API from '../../lib/api'

const state = {
  os: null,
  info: null,
  memory: null,
  disk: null,
  network: null
}

const actions = {
  async info ({ commit }) {
    const { data } = await API.get('sys')
    commit('setSystemInfo', data)
  }
}

const mutations = {
  setSystemInfo (state, info) {
    state.os = info.os
    state.info = info.info
    state.disk = info.disk
    state.memory = info.memory
    state.network = info.network
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
