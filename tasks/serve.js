'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var config = require('./config.json');


gulp.task('serve', ['styles','vendorStyles','modernizr','mainjs','vendorjs'], function () {
  browserSync({
    notify: false,
    port: 9000,
     server: {
      baseDir: [app],      
      routes: {
        '/bower_components': 'bower_components'
      },
    },
    open: "external",
  });

  // watch for changes
  gulp.watch([
    config.app+'/*.html',
    config.app+'/js/**/*.js',
    config.app+'/images/**/*',
  ]).on('change', reload);
  gulp.watch(config.app+'/**/*.scss', ['styles','vendorStyles']);
  gulp.watch(config.app+'/scripts/**/*.js', ['mainjs']);
});
