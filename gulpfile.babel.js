import gulp from "gulp";
import read from 'fs-readdir-recursive';

require('dotenv').load({
  path: __dirname + '/server/.env'
});

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
read('./gulp', function(file){
  return (/\.(js|coffee)$/i).test(file);
}).map( file => {
  require('./gulp/' + file);
});

/**
 * for dev
 */
gulp.task('default', ['webpack-dev-server', 'sass:watch', 'serve']);

/**
 * for bundling
 */
gulp.task('bundle', ['webpack-build', 'sass'], function () {
  gulp.start('zip');
});
