import API from '../../lib/api'
import debounce from '../../lib/debounce'

const state = {
  payments: undefined,
  paymentRequests: {}
}

const actions = {
  async loadPayments ({ commit }) {
    const { data } = await API.get('lnd/payments')
    commit('setPayments', data)
  },

  async decodePaymentRequest ({ commit }, { request }) {
    const { data } = await API.get(`lnd/paymentrequests/${request}`)
    data.request = request
    commit('setPaymentRequest', data)
  },

  async payPaymentRequest (_, payload) {
    await API.post('lnd/payments', payload)
    refreshPayments(this)
  }
}

const mutations = {
  setPayments (state, { payments = [] }) {
    state.payments = payments
  },

  setPaymentRequest (state, { request, ...paymentRequest }) {
    state.paymentRequests = {
      ...state.paymentRequests,
      [request]: paymentRequest
    }
  }
}

export const refreshPayments = store => debounce('REFRESH_PAYMENTS', () => {
  store.dispatch('payments/loadPayments')
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
