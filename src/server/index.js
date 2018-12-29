const { join, resolve } = require('path')
const express = require('express')
const history = require('connect-history-api-fallback')
const api = require('./api')

const { NODE_ENV, PORT } = process.env
const isDevelopment = NODE_ENV === 'development'
const server = express()

// Security
server.disable('x-powered-by')

// Static
const ONE_YEAR = 31536000000
const distPath = resolve(__dirname, '../../dist')
const staticConf = isDevelopment ? {} : { maxAge: ONE_YEAR, etag: false };

['css', 'img', 'js'].forEach(dir => {
  server.use(express.static(join(distPath, dir), staticConf))
})

// API
server.use('/api', api)

// SPA
server.use('/', history())

// Go 🚀
server.listen(PORT, () => console.debug(`⚡️ Server running on port ${PORT}!`))
