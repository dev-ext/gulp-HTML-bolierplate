'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

// variables
var app = 'app';
var dist = 'dist';
var requireDir = require('require-dir');
var tasks = requireDir('tasks/');


gulp.task('build',['styles:b','vendorStyles:b','mainjs:b', 'modernizr:b',
  'vendorjs:b','images','extras','htmlcopy:b'],function(){
  return gulp.src(dist+'/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default',['clean'],function(){
console.log('Check readme.md');
});
