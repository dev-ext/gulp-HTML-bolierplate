// Create Package 
var gulp = require('gulp');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var del = require('del');
var package = 'main';
var app = 'app';
var server = 'server';
var dist = 'dist';


gulp.task('cp:clean', function(){
  del([
    'dist/',
    'app/js',
    'app/style.css',
    'app/vendor.css',
    package
    ])
});


gulp.task('cp:server',function(){
 return gulp.src([dist+'/**/*.*'])
 .pipe(gulp.dest(package+'/'+server+'/'));
});

gulp.task('cp:server:style',function(){
 return gulp.src(package+'/'+server+'/style.min.css')
 .pipe(rename('style.css'))
 .pipe(gulp.dest(package+'/'+server+'/'));
});

gulp.task('cp:server:vendorstyle',function(){
 return gulp.src(package+'/'+server+'/vendor.min.css')
 .pipe(rename('vendor.css'))
 .pipe(gulp.dest(package+'/'+server+'/'));
});

gulp.task('cp:server:clean', function(){
  del([
    package+'/'+server+'/style.min.css',
    package+'/'+server+'/vendor.min.css'
    ])
});


gulp.task('cp', function() {
  runSequence(
  					'build',
  					'cp:server',
  					'cp:server:style',
  					'cp:server:vendorstyle',
  					'cp:server:clean'
  					);
});