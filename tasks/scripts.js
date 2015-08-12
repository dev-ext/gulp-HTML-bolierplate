var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var src = { 
  scripts:{
  modernizr:'bower_components/modernizr/modernizr.js',
  vendor:['bower_components/jquery/dist/jquery.js',
  'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
  ],
  main:'app/scripts/main.js'
  }
};

// Lint JS
gulp.task('lint', function() {
  return gulp.src('app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Main Js
gulp.task('mainjs', function(){
  return gulp.src(src.scripts.main)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest('app/js/'))
});
gulp.task('mainjs:b', function(){
  return gulp.src(src.scripts.main)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

// Vendor js
gulp.task('vendorjs', function(){
  return gulp.src(src.scripts.vendor)
    .pipe(jshint())
    .pipe(concat('vendor.js'))    
    .pipe(gulp.dest('app/js/vendor/'))
});

gulp.task('vendorjs:b', function(){
  return gulp.src(src.scripts.vendor)
    .pipe(jshint())
    .pipe(concat('vendor.js'))    
    .pipe(gulp.dest('dist/js/vendor/'))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/vendor/'));
});

// modernizr
gulp.task('modernizr', function(){
  return gulp.src(src.scripts.modernizr)   
    .pipe(uglify())
    .pipe(gulp.dest('app/js/vendor/'))
});

gulp.task('modernizr:b', function(){
  return gulp.src(src.scripts.modernizr)   
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/vendor/'));
});

