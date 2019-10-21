// 服务端
let path = require('path');

module.exports = {
  target: "node",
  mode: "development",
  entry: "./server/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
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
