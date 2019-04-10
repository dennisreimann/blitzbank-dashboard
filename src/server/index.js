/*
  this file is used to start the server in production mode:
  uses the shared server config for the API, adds production
  config, mounts the UI and launches an express app.
*/
const { resolve } = require('path')
const { createServer } = require('http')
const basicAuth = require('express-basic-auth')
const history = require('connect-history-api-fallback')
const express = require('express')
const configure = require('./configure')
const { SERVER_PORT, AUTH_USERNAME, AUTH_PASSWORD } = require('./env')

const app = express()
const server = createServer(app)

// Security
app.use(basicAuth({
  users: { [AUTH_USERNAME]: AUTH_PASSWORD },
  challenge: true,
  realm: 'Full Node Dashboard'
}))

app.disable('x-powered-by')

// API and Websockets
configure(app, server)

// Single Page App
app.use(history())

// Dashboard UI
// https://cli.vuejs.org/guide/deployment.html
const publicPath = resolve(__dirname, '../../dist')
const staticConf = { maxAge: '1y', etag: false }

app.use(express.static(publicPath, staticConf))

// Go 🚀
server.listen(SERVER_PORT, () => console.debug(`⚡️ Server running on port ${SERVER_PORT}!`))
