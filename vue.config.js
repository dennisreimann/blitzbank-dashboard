const { readFileSync } = require('fs')
const configure = require('./src/server/configure')
const { SERVER_PORT, SSL_CERT_PATH, SSL_KEY_PATH } = require('./src/server/env')

module.exports = {
  devServer: {
    port: SERVER_PORT,

    https: {
      key: readFileSync(SSL_KEY_PATH),
      cert: readFileSync(SSL_CERT_PATH)
    },

    // as we are also using a websocket for the backend app, disable inline mode.
    // https://github.com/webpack/docs/wiki/webpack-dev-server#combining-with-an-existing-server
    // inline: false,

    // https://webpack.js.org/configuration/dev-server/#devserverafter
    after (app, devServer) {
      // HACK: Using setTimeout is a pretty nasty way to get ahold of
      // the actual HTTP server the Webpack DevServer spins up.
      // Unfortunately there is no hook for post-initialization.
      setTimeout(() => {
        const { listeningApp: server } = devServer
        configure(app, server)
      }, 2500)
    }
  }
}
