import gulp from "gulp";
import gutil from "gulp-util";
import nodemon from "gulp-nodemon";
import sass from "gulp-sass";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackDevConfig from "../webpack/webpack.dev.config";
import path from "path";
import {paths} from './conf';
var browserSync = require('browser-sync').create();

/**
 * Initialize browser sync
 */
gulp.task('serve', ['nodemon'], function() {
  browserSync.init({
    serveStatic: [path.join(paths.src, '/dist')],
    port: process.env.BS_DEV_PORT
  });
});

/**
 * Start nodejs with nodemon
 */
gulp.task('nodemon', function () {
  nodemon({
    script: process.cwd() + '/server/app.js'
    , ext: 'js',
    ignore: [path.join(paths.src, '/**')]
  })
});

/**
 * webpack dev server
 */
gulp.task("webpack-dev-server", function() {
  // Start a webpack-dev-server

  var config = Object.create(webpackDevConfig);
  var compiler = webpack(config);

  new WebpackDevServer(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }).listen(process.env.WEBPACK_DEV_PORT, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", `http://localhost:${process.env.WEBPACK_DEV_PORT}${webpackDevConfig.output.publicPath}${webpackDevConfig.output.filename}`);
  });
});

/**
 * sass compilation
 */
gulp.task('sass', function () {
  return gulp.src(path.join(paths.src, '/assets/sass/**/*.sass'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(paths.src, '/dist')))
    .pipe(browserSync.stream());
});

/**
 * sass watch
 */
gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(path.join(paths.src, '/assets/sass/**/*.sass'), ['sass']);
  gulp.watch(path.join(paths.src, '/src/**/*.sass'), ['sass']);
});
