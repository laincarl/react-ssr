// 服务端
let path = require('path');
const merge = require("webpack-merge")
let baseConfig = require('./webpack.base.config')
module.exports = merge(baseConfig, {
  target: "node",
  mode: "development",
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'main.js'
  }, 
})
