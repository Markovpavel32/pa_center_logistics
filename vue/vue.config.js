const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/': 'http://lovalhost:8081'
    }
  }
}
