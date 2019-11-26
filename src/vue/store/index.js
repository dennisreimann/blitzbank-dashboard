/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import API from '../lib/api'
import btc from './modules/btc'
import lnd, { refreshBalance } from './modules/lnd'
import addresses from './modules/addresses'
import channels, { refreshChannels } from './modules/channels'
import invoices, { refreshInvoices } from './modules/invoices'
import payments, { refreshPayments } from './modules/payments'
import peers, { refreshPeers } from './modules/peers'
import system from './modules/system'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict,
  state: {
    user: undefined,
    socket: {
      isConnected: false,
      reconnectError: false
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return !!state.user
    }
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event) {
      console.error(state, event)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      console.debug(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      // https://github.com/alexbosworth/ln-service/blob/master/lightning/subscribe_to_graph.js
      console.debug('socket', message.type, message)

      switch (message.type) {
        case 'balances':
          refreshBalance(this)
          break

        case 'peer':
        case 'node_update':
          refreshPeers(this)
          break

        case 'channel':
        case 'channel_status':
        case 'channel_update':
        case 'closed_channel':
          refreshChannels(this)
          break

        case 'invoice':
        case 'channel_transaction':
          refreshInvoices(this)
          refreshPayments(this)
          refreshChannels(this)
          refreshBalance(this)
          break
      }
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    async checkSession ({ commit, dispatch }) {
      const { data, status } = await API.get('login')

      if (status === 200) {
        dispatch('lnd/loadInfo')
        commit('setUser', data)
      }
    },

    async login ({ commit, dispatch }, { username, password }) {
      const { data, status } = await API.post('login', { username, password })

      if (status === 200) {
        dispatch('lnd/loadInfo')
        commit('setUser', data)

        return true
      } else {
        return false
      }
    }
  },
  modules: {
    addresses,
    btc,
    channels,
    invoices,
    payments,
    lnd,
    peers,
    system
  }
})
