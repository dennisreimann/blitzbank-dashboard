import Vue from 'vue'
import Vuex from 'vuex'
import merge from 'deepmerge'
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

export default initial =>
  new Vuex.Store({
    strict,
    state: {
      socket: {
        isConnected: false,
        reconnectError: false
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

        // https://github.com/alexbosworth/ln-service/blob/master/lightning/conf/row_types.json
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
      }
    },
    modules: merge({
      addresses,
      btc,
      channels,
      invoices,
      payments,
      lnd,
      peers,
      system
    }, initial)
  })
