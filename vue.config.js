const Version = new Date().getTime()
module.exports = {
  // webpack����
  chainWebpack: () => {},
  configureWebpack: {
    output: {
      filename: `js/[name].js?t=${Version}`,
      chunkFilename: `js/[name].${Version}.js`
    }
  },
  // css�������
  css: {
    // �Ƿ�ʹ��css������ ExtractTextPlugin
    extract: {
      filename: `css/[name].css?t=${Version}`,
      chunkFilename: `css/[name].${Version}.css`
    },
    // ���� CSS source maps?
    sourceMap: false,
    // cssԤ����������
    loaderOptions: {},
    // ���� CSS modules for all css / pre-processor files.
    modules: false
  },
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    port: 8888, // 端口号
  }
}
