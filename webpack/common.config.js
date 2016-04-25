var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var wiredep = require('wiredep')();
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
  entry: {
    vendor_node: [
      'react',
      'react-dom',
      'react-router',
      'react-mixin',
      'mobx',
      'mobx-react',
      'lodash',
      'classnames',
      'jsonwebtoken',
      'axios',
      'basil.js',
      'react-time-picker',
      'react-leaflet',
      'singleton',
      'leaflet',
      'socket.io-client',
      'react-notification-system',
      'react-dropzone',
      'griddle-react'
    ],
    vendor_bower: []
      .concat(wiredep['css'])
      .concat(wiredep['scss'])
      .concat(wiredep['js'])
  },
  plugins: [
    new BowerWebpackPlugin({
      modulesDirectories: ["bower_components"],
      manifestFiles:      "bower.json",
      searchResolveModulesDirectories: false
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CommonsChunkPlugin({name: ['vendor_node', 'vendor_bower'], minChunks: Infinity})
  ]
};
