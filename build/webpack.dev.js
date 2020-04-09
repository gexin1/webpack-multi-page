/*
 * @Author: river
 * @Date: 2020-04-09 11:33:23
 * @Last Modified by: river
 * @Last Modified time: 2020-04-09 14:09:47
 */
const merge = require("webpack-merge");
const base = require("./webpack.base");
const { resolve } = require("./webpack.help");

module.exports = merge(
  {
    mode: "development",
  },
  base
);
