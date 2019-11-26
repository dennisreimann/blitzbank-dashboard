/*
  this file is used to start the server in production mode:
  uses the shared server config for the API, adds production
  config, mounts the UI and launches an express app.
*/
const { readFileSync } = require('fs')
const { join, resolve } = require('path')
const { createServer } = require('https')
const { verifyClient } = require('ln-service/push')

const WebSocket = require('ws')
const express = require('express')
const history = require('connect-history-api-fallback')
const configure = require('./configure')
const { SERVER_PORT, SSL_CERT_PATH, SSL_KEY_PATH } = require('./env')

const app = express()
const cert = readFileSync(SSL_CERT_PATH)
const key = readFileSync(SSL_KEY_PATH)
const server = createServer({ cert, key }, app)
const socketServer = new WebSocket.Server({ server, verifyClient })

// Session, API and Websockets
configure(app, server, socketServer)

// Security
app.disable('x-powered-by')

// Single Page App
app.use(history())

// Dashboard UI
// https://cli.vuejs.org/guide/deployment.html
const publicPath = resolve(__dirname, '../dist')
const staticConf = { maxAge: '1y', etag: false };

['img', 'css', 'js'].forEach(dir => {
  app.use(express.static(join(publicPath, dir), staticConf))
})
app.use(express.static(publicPath))

// Go 🚀
server.listen(SERVER_PORT, () => console.debug(`⚡️ Server running on port ${SERVER_PORT}!`))
