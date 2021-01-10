const path = require('path')
// const webpack = require('webpack')
// const CompressionPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  publicPath: '/',
  parallel: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/')
        // '@assets': path.join(__dirname, 'public/assets/')
      }
    },
    plugins: [
      /**
       * gz 압축파일 생성하기 (gzip)
       * CompressionWebpackPlugin : https://v4.webpack.js.org/plugins/compression-webpack-plugin/
       */
      // new CompressionPlugin({
      //   test: /\.(js|css)$/i, // js, css파일만 압축파일 생성
      //   threshold: 10240
      // }),
      /**
       * moment.js locale파일 줄이기 : https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
       * ContextReplacementPlugin : https://v4.webpack.js.org/plugins/context-replacement-plugin/
       */
      // new MomentLocalesPlugin({ localesToKeep: ['es-us', 'ko'] }),
      // chunk 파일 갯수제한
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 35
      // }),
      /**
       * Quill ImageResize 모듈 'imports' of undefined 관련
       *  : https://github.com/kensnyder/quill-image-resize-module/issues/7
       * ProvidePlugin : https://v4.webpack.js.org/plugins/provide-plugin/
       */
      // new webpack.ProvidePlugin({
      //   'window.Quill': 'quill'
      // })
      // new BundleAnalyzerPlugin()
    ],
    // 최적화
    // optimization: {
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     chunks: 'all',
    //     maxInitialRequests: Infinity,
    //     minSize: 0,
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name (module) {
    //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
    //           return `npm.${packageName.replace('@', '')}`
    //         }
    //       },
    //       styles: {
    //         test: /\.css$/,
    //         name: 'styles',
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    devtool: false
  },
  chainWebpack: config => {
    // 파일명 규칙
    // config.output.chunkFilename(`js/[id].[chunkhash:${Math.floor(Math.random() * 19 + 1)}].js?t=${new Date().getTime()}`)
    // 이미지는 Data URI Scheme을 적용하기 위해 url-loader를 사용하지만 IE에서 data URI Scheme를 적용하면 오류가 나서 limit를 0으로 함
    // const keys = ['images', 'fonts']
    // keys.forEach(key => {
    //   config.module
    //     .rule(key)
    //     .use('url-loader')
    //     .loader('url-loader')
    //     .tap(options => Object.assign(options, { limit: 0 }))
    // })
  },
  devServer: {
    // local dev server Host Check 끄기
    // disableHostCheck: true,
    // local dev server 압축 켜기
    // compress: true,
    /**
     * http-proxy options : https://github.com/chimurai/http-proxy-middleware#http-proxy-options
     */
    // proxy: {
    //   /**
    //    * (로컬 proxy -> intranet 개발서버) 강남센터 API
    //    */
    //   '^/v3/web': {
    //     target: process.env.VUE_APP_URL,
    //     secure: false,
    //     changeOrigin: true
    //   },
    //   /**
    //    * (로컬 proxy -> 포털 파일업로드) 강남센터 API
    //    */
    //   '^/api/fileupload': {
    //     target: process.env.VUE_APP_URL,
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  }
}
