module.exports = {
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
      }, {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: [{
          loader: 'isomorphic-style-loader',
        }, {
          loader: 'css-loader',
        }]
      }, {
        test: /\.scss$/,
        exclude: '/node_modules/',
        use: [{
          loader: 'isomorphic-style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }]
      }
    ]
  }
}
