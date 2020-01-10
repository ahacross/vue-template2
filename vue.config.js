module.exports = {
  outputDir: 'www',
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }
}
