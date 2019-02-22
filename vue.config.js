const configureAPI = require('./src/server/configure')

module.exports = {
  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devserverbefore
    before: configureAPI
  }
}
