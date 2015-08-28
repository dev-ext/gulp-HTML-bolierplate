// Create config.package 
var gulp = require('gulp');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var del = require('del');
var config = require('./config.json');



// Create Server

gulp.task('cp:server:dist',function(){
 return gulp.src([config.dist+'/**/*.*'])
 .pipe(gulp.dest(config.package+'/'+config.server+'/'));
});

gulp.task('cp:server:style',function(){
 return gulp.src(config.package+'/'+config.server+'/style.min.css')
 .pipe(rename('style.css'))
 .pipe(gulp.dest(config.package+'/'+config.server+'/'));
});

gulp.task('cp:server:vendorstyle',function(){
 return gulp.src(config.package+'/'+config.server+'/vendor.min.css')
 .pipe(rename('vendor.css'))
 .pipe(gulp.dest(config.package+'/'+config.server+'/'));
});

gulp.task('cp:server:clean', function(){
  del([
    config.package+'/'+config.server+'/style.min.css',
    config.package+'/'+config.server+'/vendor.min.css'
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
    '!node_modules/**/*.*',
    '!'+config.app+'/images/**/*.*',    
    '!'+config.package+'/**/*.*',
    '!'+config.dist+'/**/*.*',
    '!.git/**/*.*'])
 .pipe(gulp.dest(config.package+'/'+config.stack+'/'));
});

// Create HTMl Dist
gulp.task('cp:client:dist',function(){
 return gulp.src([config.dist+'/**/*.*'])
 .pipe(gulp.dest(config.package+'/'+config.html+'/'));
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