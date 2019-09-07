/*
  shared server configuration for dev and prod env.
  dev: Webpack Dev Server -> vue.config.js
  prod: Express -> ./index.js
*/
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const { Strategy: LocalStrategy } = require('passport-local')
const { Server: WebSocketServer } = require('ws')
const { json } = require('express')
const { subscribeToGraph, subscribeToInvoices, subscribeToTransactions } = require('ln-service/push')
const { lnd } = require('./services/lnd')
const { NODE_ENV, AUTH_USERNAME, AUTH_PASSWORD, SESSION_SECRET } = require('./env')

const { log } = console
const isDevelopment = NODE_ENV === 'development'

module.exports = (app, server) => {
  // Logging
  app.use(logger(isDevelopment ? 'dev' : 'combined'))

  // Body parsing
  app.use(json())

  // Session and login
  // http://www.passportjs.org/docs/configure/
  // http://www.passportjs.org/packages/passport-local/
  passport.use(new LocalStrategy(
    (username, password, done) =>
      username === AUTH_USERNAME && password === AUTH_PASSWORD
        ? done(null, { username })
        : done(null, false)
  ))

  passport.serializeUser(({ username }, done) => {
    done(null, username)
  })

  passport.deserializeUser((username, done) => {
    done(null, { username })
  })

  app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true }
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  // API
  app.use('/api', require('./api'))

  // Websocket
  // https://github.com/websockets/ws/blob/master/doc/ws.md
  const socket = new WebSocketServer({ server })
  const wss = [socket]

  // LN Service Push methods
  // https://github.com/alexbosworth/ln-service/tree/master/push
  subscribeToGraph({ lnd, log, wss })
  subscribeToInvoices({ lnd, log, wss })
  subscribeToTransactions({ lnd, log, wss })
}
