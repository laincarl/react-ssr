// 服务端
let path = require('path');

module.exports = {
  target: "node",
  mode: "development",
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }]
      }
    ]
  }
}
