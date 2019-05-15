import API from '../../lib/api'

const state = {
  newAddress: undefined
}

const actions = {
  async createAddress ({ commit }, payload) {
    const { data: { address } } = await API.post('lnd/addresses', payload)
    commit('setNewAddress', address)
  }
}

const mutations = {
  setNewAddress (state, address) {
    state.newAddress = address
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
