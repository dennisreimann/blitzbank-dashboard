/*
  shared server configuration for dev and prod env.
  dev: Webpack Dev Server -> vue.config.js
  prod: Express -> ./index.js
*/
const morgan = require('morgan')
const { json } = require('express')

module.exports = (server, devServer) => {
  // Logging
  const isDevelopment = process.env.NODE_ENV === 'development'
  server.use(morgan(isDevelopment ? 'dev' : 'combined'))

  // API
  server.use(json())
  server.use('/api', require('./api'))
}
