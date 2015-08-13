// Create Package 
var gulp = require('gulp');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var del = require('del');
var package = 'main';
var app = 'app';
var server = 'server';
var dist = 'dist';
var stack = 'development-stack';
var html = 'html';

gulp.task('cp:clean', function(){
  del([
    'dist/',
    'app/js',
    'app/style.css',
    'app/vendor.css',
    package
    ])
});

// Create Server

gulp.task('cp:server:dist',function(){
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

gulp.task('cp:server', function() {
  runSequence(
  					'build',
  					'cp:server:dist',
  					'cp:server:style',
  					'cp:server:vendorstyle',
  					'cp:server:clean'
  					);
});

// Create Dev Stack
gulp.task('cp:stack:dist',function(){
 return gulp.src(['**/*.*',
    '!bower_components/**/*.*',
    '!app/php/api/config.php',
    '!app/images/**/*.*',
    '!node_modules/**/*.*',
    '!main/**/*.*',
    '!dist/**/*.*',
    '!.git/**/*.*'])
 .pipe(gulp.dest(package+'/'+stack+'/'));
});

// Create HTMl Dist
gulp.task('cp:client:dist',function(){
 return gulp.src([dist+'/**/*.*'])
 .pipe(gulp.dest(package+'/'+html+'/'));
});
gulp.task('cp:client', function() {
  runSequence(
            'htmlcopy',
            'cp:client:dist'
            );
});

gulp.task('cp', function() {
  runSequence(
            ['cp:server'],
            ['cp:stack:dist']
            );
});