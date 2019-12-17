const { readFileSync } = require('fs')
const configure = require('./server/configure')
const { SERVER_HOST, SERVER_PORT, SSL_CERT_PATH, SSL_KEY_PATH } = require('./server/env')

module.exports = {
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,

    // FIXME: Disable progress output until this issue is resolved:
    // https://github.com/vuejs/vue-cli/issues/4557#issuecomment-545965828
    progress: false,

    https: {
      key: readFileSync(SSL_KEY_PATH),
      cert: readFileSync(SSL_CERT_PATH)
    },

    // https://webpack.js.org/configuration/dev-server/#devservertransportmode
    transportMode: 'ws',
    sockPath: '/',

    // https://webpack.js.org/configuration/dev-server/#devserveronlistening
    onListening (devServer) {
      const { app, listeningApp: server, socketServer: { wsServer } } = devServer
      configure(app, server, wsServer)
    }
  }
}
