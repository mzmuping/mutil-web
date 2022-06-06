const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // static: false,
    static: {
      // 静态资源
      directory: path.resolve('dist'),
    },
    hot: true,
    client: {
      overlay: true,
    },
    // allowedHosts: 'all',
    // bonjour: true,
    compress: true,
    port: 9000,
  },
});
