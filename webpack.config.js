const webpack = require('webpack');

module.exports = {
  entry: {
    app: __dirname + '/src',
    vendor: [
      'jquery',
      'angular',
      'socket.io-client',
      'angularjs-scroll-glue'
    ]
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'ng-cache-loader?prefix=app/' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor.bundle.js"
      })
    ],
    resolve: {
     alias: {
       jquery: "jquery/src/jquery"
     }
   }
}
