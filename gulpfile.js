'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var config = require('./tasks/config.json');
var requireDir = require('require-dir');
var tasks = requireDir('tasks/');


gulp.task('build',['styles:b','vendorStyles:b','mainjs:b', 'headjs:b',
  'vendorjs:b','images','extras','htmlcopy:b','bowerfont'],function(){
  return gulp.src(config.dist+'/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default',['clean'],function(){
console.log('Check readme.md');

});
