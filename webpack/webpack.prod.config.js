var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./common.config');
var CleanWebpackPlugin = require('clean-webpack-plugin');


require('dotenv').load({
  path: './server/.env'
});

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: Object.assign({}, {
    app: './client/src/index'
  }, commonConfig.entry),
  output: {
    path: './client/dist',
    filename: '[name]-[hash].js',
    publicPath: process.env.DOMAIN + '/dist/' //https://github.com/webpack/style-loader/issues/55
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
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        )
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
    new CleanWebpackPlugin(['client/dist', 'build'],{
      root: process.cwd(),
      verbose: true
    }),
    new ExtractTextPlugin('[name]-[contenthash].css', {allChunks: false}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      'JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
      'S3_CONFIG': JSON.stringify(require('../server/config/s3').s3Config)
    }),
    new ManifestPlugin({
      basePath: '/dist/'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ].concat(commonConfig.plugins)
};
