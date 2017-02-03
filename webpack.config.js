const webpack = require('webpack');

module.exports = {
  entry: {
    app: __dirname + '/src',
    vendor: [
      'jquery',
      'angular'
    ]
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          filename: "vendor.bundle.js"
      })
    ]
}
