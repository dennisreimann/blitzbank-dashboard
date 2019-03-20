/*
  shared server configuration for dev and prod env.
  dev: Webpack Dev Server -> vue.config.js
  prod: Express -> ./index.js
*/
const logger = require('morgan')
const { Server: WebSocketServer } = require('ws')
const { json } = require('express')
const { subscribeToGraph, subscribeToInvoices, subscribeToTransactions } = require('ln-service/push')
const { lnd } = require('./services/lnd')
const { SOCKET_PORT, NODE_ENV } = require('../env')

const { log } = console

module.exports = (app, server) => {
  // Logging
  const isDevelopment = NODE_ENV === 'development'
  app.use(logger(isDevelopment ? 'dev' : 'combined'))

  // API
  app.use(json())
  app.use('/api', require('./api'))

  // Websocket
  // https://github.com/websockets/ws/blob/master/doc/ws.md
  const socket = new WebSocketServer({ port: SOCKET_PORT })
  const wss = [socket]

  // LN Service Push methods
  // https://github.com/alexbosworth/ln-service/tree/master/push
  subscribeToGraph({ lnd, log, wss })
  subscribeToInvoices({ lnd, log, wss })
  subscribeToTransactions({ lnd, log, wss })
}
