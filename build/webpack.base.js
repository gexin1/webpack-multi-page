/*
 * @Author: river
 * @Date: 2020-04-09 11:33:23
 * @Last Modified by: river
 * @Last Modified time: 2020-04-09 11:42:46
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve, getEntry, getHtmls } = require('./webpack.help');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const config = require('./config');
const entry = getEntry();
const htmls = getHtmls();
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
  entry,
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('../src'),
      '@images': resolve('../src/assets/images'),
      '@libs': resolve('../src/libs'),
      '@template': resolve('../src/template'),
      '@utils': resolve('../src/utils'),
      '@views': resolve('../src/views'),
      '@js': resolve('../src/js'),
    },
  },
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        loader: 'underscore-template-loader',
        query: {
          attributes: ['img:data-src', 'img:src', 'div:data-src'],
        },
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 10000,
              name: config.assetsSubDirectory + '/img/[name].[hash:9].[ext]',
              publicPath: devMode
                ? config.dev.assetsPublicPath
                : config.build.assetsPublicPath,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
              publicPath: '/css/',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
              publicPath: '/css/',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [resolve('../src/styles/variable.scss')],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    stats: 'errors-only',
    compress: true,
    host: 'localhost',
    port: 7001,
  },
  externals: {
    jquery: '$',
    jquery: 'jQuery',
    bootstrap: 'bootstrap',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/' + (devMode ? '[name].css' : '[name].[contenthash].css'),
      chunkFilename:
        'css/' + (devMode ? '[name].css' : '[name].[contenthash].css'),
    }),
    ...htmls,
  ],
};
