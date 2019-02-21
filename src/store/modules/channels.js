import API from '../../lib/api'

const state = {
  newAddress: null
}

const getters = {
  newAddress: state => state.newAddress
}

const actions = {
  async createAddress ({ commit }) {
    const { data: { address } } = await API.post('lnd/addresses')
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
  getters,
  actions,
  mutations
}
