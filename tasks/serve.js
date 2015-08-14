'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

// variables
var app = 'app';
var dist = 'dist';

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
    app+'/*.html',
    app+'/js/**/*.js',
    app+'/images/**/*',
  ]).on('change', reload);
  gulp.watch(app+'/**/*.scss', ['styles','vendorStyles']);
  gulp.watch(app+'/scripts/**/*.js', ['mainjs']);
});
