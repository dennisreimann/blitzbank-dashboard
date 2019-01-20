const { resolve } = require('path')
const express = require('express')
const basicAuth = require('express-basic-auth')
const history = require('connect-history-api-fallback')
const api = require('./api')

const { NODE_ENV, PORT, AUTH_USERNAME, AUTH_PASSWORD } = process.env
const isDevelopment = NODE_ENV === 'development'
const server = express()

// Security
server.disable('x-powered-by')

server.use(basicAuth({
  users: { [AUTH_USERNAME]: AUTH_PASSWORD },
  challenge: true,
  realm: 'Dashboard'
}))

// Static
const publicPath = resolve(__dirname, '../..', isDevelopment ? 'public' : 'dist')
const staticConf = isDevelopment ? {} : { maxAge: '1y', etag: false }

server.use(express.static(publicPath, staticConf))

// API
server.use('/api', api)

// SPA
server.use('/', history())

// Go 🚀
server.listen(PORT, () => console.debug(`⚡️ Server running on port ${PORT}!`))
