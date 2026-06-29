module.exports = {
  configureWebpack: {
    externals: {
      vue: 'vue',
      three: 'three',
      '3d-tiles-renderer': '3d-tiles-renderer'
    }
  }
};