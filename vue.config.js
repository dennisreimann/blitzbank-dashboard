const configure = require('./src/server/configure')
const { SERVER_PORT } = require('./src/server/env')

module.exports = {
  devServer: {
    port: SERVER_PORT,

    // as we are also using a websocket for the backend app, disable inline mode.
    // https://github.com/webpack/docs/wiki/webpack-dev-server#combining-with-an-existing-server
    inline: false,

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
