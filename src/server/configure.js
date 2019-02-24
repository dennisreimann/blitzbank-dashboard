/*
  shared server configuration for dev and prod env.
  dev: Webpack Dev Server -> vue.config.js
  prod: Express -> ./index.js
*/
const morgan = require('morgan')
const bodyParser = require('body-parser')

module.exports = (server, devServer) => {
  // Logging
  const isDevelopment = process.env.NODE_ENV === 'development'
  server.use(morgan(isDevelopment ? 'dev' : 'combined'))

  // API
  server.use(bodyParser.json())
  server.use('/api', require('./api'))
}
