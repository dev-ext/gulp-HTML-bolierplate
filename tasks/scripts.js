var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var config = require('./config.json');


// Lint JS
gulp.task('lint', function() {
  return gulp.src(config.app+'/scripts/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter('default'));
});

// Main Js
gulp.task('mainjs', function(){
  return gulp.src(config.app+'/'+config.mainjs)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest(config.app+'/js/'))
});
gulp.task('mainjs:b', function(){
  return gulp.src(config.app+'/'+config.mainjs)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest(config.dist+'/js/'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist+'/js/'));
});

// Vendor js
gulp.task('vendorjs', function(){
  return gulp.src(config.vendor)
    .pipe(jshint())
    .pipe(concat('vendor.js'))    
    .pipe(gulp.dest('app/js/vendor/'))
});

gulp.task('vendorjs:b', function(){
  return gulp.src(config.vendor)
    .pipe(jshint())
    .pipe(concat('vendor.js'))    
    .pipe(gulp.dest(config.dist+'/js/vendor/'))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist+'/js/vendor/'));
});

// modernizr
gulp.task('headjs', function(){
  return gulp.src(config.headjs)  
    .pipe(concat('headscripts.js'))  
    .pipe(uglify())
    .pipe(gulp.dest(config.app+'/js/vendor/'))
});

gulp.task('headjs:b', function(){
  return gulp.src(config.headjs)   
    .pipe(concat('headscripts.js')) 
    .pipe(uglify())
    .pipe(gulp.dest(config.dist+'/js/vendor/'));
});

