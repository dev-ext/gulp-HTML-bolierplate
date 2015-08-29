var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var minifyHTML = require('gulp-minify-html');
var config = require('./config.json');
// HTML and  others Copy
gulp.task('htmlcopy',function(){
 return gulp.src([config.app+'/*.html'])
 .pipe(gulp.dest(config.dist));
});

gulp.task('htmlcopy:b',function(){
  var opts = {
    conditionals: true,
    spare:true,
    empty :true
  };
 return gulp.src([config.app+'/*.html'])
 .pipe(minifyHTML(opts)) 
 .pipe(gulp.dest(config.dist));
});

gulp.task('bowerfont',function(){
 return gulp.src(config.bowerfont)
 .pipe(gulp.dest(config.fontpath))
});

gulp.task('bowerfont:b',function(){
 return gulp.src(config.bowerfont)
 .pipe(gulp.dest(config.d_fontpath))
});

gulp.task('extras', function () {
  return gulp.src([
    config.app+'/*.*',
    '!'+config.app+'/*.html',
    '!'+config.app+'/*.scss'
  ], {
    dot: true
  }).pipe(gulp.dest(config.dist));
});
