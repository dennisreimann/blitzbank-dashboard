const configure = require('./src/server/configure')
const { SOCKET_PORT } = require('./src/env')

// https://cli.vuejs.org/guide/mode-and-env.html#modes
process.env.VUE_APP_SOCKET_PORT = SOCKET_PORT

module.exports = {
  devServer: {
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
