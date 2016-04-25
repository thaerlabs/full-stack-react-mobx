import gulp from "gulp";
import gutil from "gulp-util";
import webpack from "webpack";
import webpackProdConfig from "../webpack/webpack.prod.config";
import copy from "gulp-copy";
import debug from "gulp-debug";
import path from "path";
import zip from "gulp-zip";
import {paths} from './conf';

/**
 * webpack build task
 */
gulp.task('webpack-build', function(callback) {

  var config = Object.create(webpackProdConfig);
  var compiler = webpack(config);

  compiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack-build", err);

    callback();
  });

});

/**
 * Copy content to build folder
 */
gulp.task('copy', function () {
  var allFiles = [].concat(
    'package.json',
    'server/**/*',
    './.babelrc',
    path.join(paths.src, '/assets/fonts/**/*'),
    path.join(paths.src, '/dist/**/*'),
    path.join(paths.src, '/index.ejs')
  );
  return gulp.src(allFiles)
    .pipe(debug({
      title: 'file:'
    }))
    .pipe(copy(paths.dist));
});

/**
 * Zip the build folder
 */
gulp.task('zip', ['copy'], function() {
  return gulp.src(path.join(paths.dist, '/**/*'), {dot: true})
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('zip'));

});
