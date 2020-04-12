/*
 * @Author: river
 * @Date: 2020-04-09 11:33:23
 * @Last Modified by: river
 * @Last Modified time: 2020-04-09 14:19:13
 */
const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = (...dir) => path.resolve(__dirname, ...dir);
// 基础页面路径
const baseViewPath = resolve("../src/views");
/**
 * 获取入口文件
 */
const getEntry = () => {
  const obj = {};
  const fields = fs.readdirSync(baseViewPath);
  fields.map(k => {
    obj[k] = resolve(baseViewPath, k, "./index.js");
  });
  return obj;
};
const getHtmls = () => {
  const arr = [];
  const fields = fs.readdirSync(baseViewPath);
  fields.map(k => {
    const html = resolve(baseViewPath, k, "./index.html");
    arr.push(
      new HtmlWebpackPlugin({
        template: html,
        filename: `./${k}.html`,
        inject: true,
        hash: true,
        chunks: ["vendors", k],
        favicon: resolve("../public/favicon.ico"),
        minify:true
      })
    );
  });
  return arr;
};
module.exports = {
  resolve,
  getEntry,
  getHtmls
};
