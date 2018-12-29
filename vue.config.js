module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:4000'
      }
    }
  }
}
