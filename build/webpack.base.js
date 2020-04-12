/*
 * @Author: river
 * @Date: 2020-04-09 11:33:23
 * @Last Modified by: river
 * @Last Modified time: 2020-04-09 14:11:19
 */
const { resolve, getEntry, getHtmls } = require('./webpack.help');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const config = require('./config');
const entry = getEntry();
const htmls = getHtmls();
const devMode = process.env.NODE_ENV !== 'production';
// console.log([...config.buildSpeed, "babel-loader"])
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
        alias: config.alias,
        modules: [resolve('../src'), 'node_modules'],
    },
    // module: {
    //   noParse: /jquery|lodash/,
    // },
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/,
                options: {
                    fix: true,
                    formatter: require('eslint-friendly-formatter'),
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [...config.buildSpeed, 'babel-loader'],
            },
            {
                test: /\.html$/,
                loader: 'underscore-template-loader',
                exclude: /node_modules/,
                query: {
                    attributes: ['img:data-src', 'img:src', 'div:data-src'],
                },
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 10000,
                            name: 'images/[name].[hash:9].[ext]',
                            publicPath: devMode
                                ? config.dev.assetsPublicPath
                                : config.build.assetsPublicPath,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
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
                exclude: /node_modules/,
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
                        options: config.sassOption,
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?name=fonts/[name].[ext]',
            },
        ],
    },
    devServer: config.dev.devServer,
    externals: config.externals,
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.ProvidePlugin(config.provide),
        new MiniCssExtractPlugin({
            filename:
                'css/' + (devMode ? '[name].css' : '[name].[contenthash].css'),
            chunkFilename:
                'css/' + (devMode ? '[name].css' : '[name].[contenthash].css'),
        }),
        ...htmls,
    ],
};
