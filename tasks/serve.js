'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var config = require('./config.json');


gulp.task('serve', ['styles','vendorStyles','headjs','mainjs','vendorjs','bowerfont'], function () {
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

gulp.task('serve:dist',function  () {
  browserSync({
    notify: false,
    port: 9001,
     server: {
      baseDir: [config.dist]
    },
    open: "external",
  });
});

gulp.task('serve:server',function  () {
  browserSync({
    notify: false,
    port: 9002,
     server: {
      baseDir: [config.p_server]
    },
    open: "external",
  });
});

gulp.task('serve:client',function  () {
  browserSync({
    notify: false,
    port: 9003,
     server: {
      baseDir: [config.p_client]
    },
    open: "external",
  });
});


