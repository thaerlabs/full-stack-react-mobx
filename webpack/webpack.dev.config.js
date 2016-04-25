var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var commonConfig = require('./common.config');

require('dotenv').load({
  path: './server/.env'
});

module.exports = {
  devtool: 'eval',
  entry: Object.assign({}, {
    app: [
      `webpack-dev-server/client?http://localhost:${process.env.WEBPACK_DEV_PORT}`,
      'webpack/hot/only-dev-server',
      './client/src/index'
    ]
  }, commonConfig.entry),
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: '[name].js',
    publicPath: `http://localhost:${process.env.WEBPACK_DEV_PORT}/static/`
  },
  progress: true,
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules', './client/src']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot','babel']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      { test: /\.(png|jpg|jpeg|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
      'S3_CONFIG': JSON.stringify(require('../server/config/s3').s3Config)
    }),
    new webpack.HotModuleReplacementPlugin()
  ].concat(commonConfig.plugins)
};
