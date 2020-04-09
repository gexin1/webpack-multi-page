/*
 * @Author: river
 * @Date: 2020-04-09 11:33:23
 * @Last Modified by: river
 * @Last Modified time: 2020-04-09 14:46:20
 */
const { resolve } = require('./webpack.help');
module.exports = {
  //不打入项目使用cdn引入
  externals: {
    jquery: '$',
    jquery: 'jQuery',
    bootstrap: 'bootstrap',
  },
  // 全局注入项目
  provide: {
    $: 'jquery',
    jQuery: 'jquery',
  },
  //路径别名
  alias: {
    '@': resolve('../src'),
  },
  // 全局样式
  sassOption: {
    resources: [resolve('../src/styles/variable.scss')],
  },
  dev: {
    assetsPublicPath: '/',
    devServer: {
      contentBase: './dist',
      stats: 'errors-only',
      compress: false,
      host: 'localhost',
      port: 7001,
      open: true
    },
  },
  build: {
    assetsPublicPath: '/',
  },
};
