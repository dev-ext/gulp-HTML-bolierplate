'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var config = require('./config.json');


gulp.task('serve', ['styles','vendorStyles','headjs','mainjs','vendorjs'], function () {
  browserSync({
    notify: false,
    port: 9000,
     server: {
      baseDir: [config.app],      
      routes: {
        '/bower_components': 'bower_components'
      },
    },
    open: "external",
  });

  // watch for changes
  gulp.watch([
    config.app+'/*.html',
    config.compile_js+'**/*.js',
    config.images+'**/*',
  ]).on('change', reload);
  gulp.watch(config.app+'/**/*.scss', ['styles','vendorStyles']);
  gulp.watch(config.scripts+'**/*.js', ['mainjs']);
});
