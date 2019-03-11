/*
  this file is used to start the server in production mode:
  uses the shared server config for the API, adds production
  config, mounts the UI and launches an express server.
*/
const { resolve } = require('path')
const assert = require('assert')
const basicAuth = require('express-basic-auth')
const history = require('connect-history-api-fallback')
const express = require('express')
const configureAPI = require('./configure')
const compression = require('compression')
const server = express()

const {
  SERVER_PORT = 4000,
  AUTH_USERNAME,
  AUTH_PASSWORD
} = process.env

// Security
assert(AUTH_USERNAME && AUTH_PASSWORD, 'Provide the AUTH_USERNAME and AUTH_PASSWORD environment variables.')

server.use(basicAuth({
  users: { [AUTH_USERNAME]: AUTH_PASSWORD },
  challenge: true,
  realm: 'Full node'
}))

server.disable('x-powered-by')

// Preformance
server.use(compression)

// API
configureAPI(server)

// Dashboard UI
// https://cli.vuejs.org/guide/deployment.html
const publicPath = resolve(__dirname, '../../dist')
const staticConf = { maxAge: '1y', etag: false }

server.use(express.static(publicPath, staticConf))
server.use('/', history())

// Go 🚀
server.listen(SERVER_PORT, () => console.debug(`⚡️ Server running on port ${SERVER_PORT}!`))
