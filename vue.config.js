const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  // assetsDir:'dist',
  indexPath: 'index.html',
  filenameHashing: true,
  configureWebpack: {
    name: 'joker-blog',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
