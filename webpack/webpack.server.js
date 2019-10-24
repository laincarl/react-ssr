// 服务端
let path = require('path');
const merge = require("webpack-merge")
let baseConfig = require('./webpack.base.config')
module.exports = merge(baseConfig, {
  target: "node",
  mode: "development",
  entry: ['@babel/polyfill', "./server/index.js"],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js'
  },
})