const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              autoprefixer: false,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            } 
          } 
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'video editor',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false,
    compress: true,
    host: '0.0.0.0',
    port: 8001,
    useLocalIp: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }

}

module.exports = merge(base, config);

console.log(JSON.stringify(merge(base, config).module.rules));