/*
 * @Author: river
 * @Date: 2020-04-09 11:33:23
 * @Last Modified by:   river
 * @Last Modified time: 2020-04-09 11:33:23
 */
const merge = require("webpack-merge");
const base = require("./webpack.base");
const { resolve } = require("./webpack.help");

module.exports = merge(
  {
    mode: "development",
    devServer: {
      contentBase: resolve("dist"),
      compress: true,
      port: 7001,
      open: true
    },
    output: {
      path: resolve("../dist"),
      publicPath: "./",
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[id].chunk.[contenthash].js"
    }
  },
  base
);
