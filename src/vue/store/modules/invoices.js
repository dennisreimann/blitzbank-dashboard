import API from '../../lib/api'
import debounce from '../../lib/debounce'

const state = {
  invoices: undefined
}

const actions = {
  async loadInvoices ({ commit }) {
    const { data } = await API.get('lnd/invoices')
    commit('setInvoices', data)
  },

  async createInvoice (_, payload) {
    await API.post('lnd/invoices', payload)
    refreshInvoices(this)
  }
}

const mutations = {
  setInvoices (state, { invoices = [] }) {
    state.invoices = invoices
  }
}

export const refreshInvoices = store => debounce('REFRESH_INVOICES', () => {
  store.dispatch('invoices/loadInvoices')
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
