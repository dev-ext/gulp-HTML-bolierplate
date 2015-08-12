var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var minifyHTML = require('gulp-minify-html');

// HTML and  others Copy
gulp.task('htmlcopy',function(){
 return gulp.src(['app/*.html'])
 .pipe(gulp.dest('dist'));
});

gulp.task('htmlcopy:b',function(){
  var opts = {
    conditionals: true,
    spare:true
  };
 return gulp.src(['app/*.html'])
 .pipe(minifyHTML(opts)) 
 .pipe(gulp.dest('dist'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!'+'app/*.html',
    '!'+'app/*.scss'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});
