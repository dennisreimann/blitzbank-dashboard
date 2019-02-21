const { resolve } = require('path')
const assert = require('assert')
const morgan = require('morgan')
const express = require('express')
const basicAuth = require('express-basic-auth')
const history = require('connect-history-api-fallback')
const bodyParser = require('body-parser')

const { NODE_ENV, SERVER_PORT, AUTH_USERNAME, AUTH_PASSWORD } = process.env
const isDevelopment = NODE_ENV === 'development'
const server = express()

// Security
assert(AUTH_USERNAME && AUTH_PASSWORD, 'Provide the AUTH_USERNAME and AUTH_PASSWORD environment variables.')

server.use(basicAuth({
  users: { [AUTH_USERNAME]: AUTH_PASSWORD },
  challenge: true,
  realm: 'Full node'
}))

server.disable('x-powered-by')

// Logging
server.use(morgan(isDevelopment ? 'dev' : 'combined'))

// API
server.use(bodyParser.json())
server.use('/api', require('./api'))

// Dashboard UI
const publicPath = resolve(__dirname, '../..', isDevelopment ? 'public' : 'dist')
const staticConf = isDevelopment ? {} : { maxAge: '1y', etag: false }

server.use(express.static(publicPath, staticConf))
server.use('/', history())

// Go 🚀
server.listen(SERVER_PORT, () => console.debug(`⚡️ Server running on port ${SERVER_PORT}!`))
