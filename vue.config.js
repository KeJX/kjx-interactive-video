module.exports = {
  lintOnSave: false,
  useEslint:false,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}

const px2rem = require('postcss-pxtorem')

const postcss = px2rem({
  remUnit: 16   //基准大小 baseSize，需要和rem.js中相同
})

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },

  lintOnSave: false
}