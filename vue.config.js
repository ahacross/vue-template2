module.exports = {
  outputDir: 'www',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true
      }
    }
  }
}
