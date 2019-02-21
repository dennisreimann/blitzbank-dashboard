import API from '../../lib/api'

const state = {
  info: null
}

const getters = {
  info: state => state.info
}

const actions = {
  async info ({ commit }) {
    const { data } = await API.get('sys')
    commit('setInfo', data)
  }
}

const mutations = {
  setInfo (state, info) {
    state.info = info
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
