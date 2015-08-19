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
gulp.task('cp:server:vendorjs',function(){
 return gulp.src(package+'/'+server+'/js/vendor/vendor.min.js')
 .pipe(rename('vendor.js'))
 .pipe(gulp.dest(package+'/'+server+'/js/vendor/'));
});
gulp.task('cp:server:mainjs',function(){
 return gulp.src(package+'/'+server+'/js/main.min.js')
 .pipe(rename('main.js'))
 .pipe(gulp.dest(package+'/'+server+'/js/'));
})

gulp.task('cp:server:clean', function(){
  del([
    package+'/'+server+'/style.min.css',
    package+'/'+server+'/vendor.min.css',
    package+'/'+server+'/js/vendor/vendor.min.js',
    package+'/'+server+'/js/main.min.js'    
    ])
});



// Create Dev Stack
gulp.task('cp:stack:dist',function(){
 return gulp.src(['**/*.*',
    '!bower_components/**/*.*',
    '!app/images/**/*.*',
    '!node_modules/**/*.*',
    '!main/**/*.*',
    '!dist/**/*.*',
    '!.git/**/*.*'])
 .pipe(gulp.dest(package+'/'+stack+'/'));
});
gulp.task('cp:stack:clean', function(){
  del([
    package+'/'+stack+'/task/package.js'
    ])
});

// Create HTMl Dist
gulp.task('cp:client:dist',function(){
 return gulp.src([dist+'/**/*.*'])
 .pipe(gulp.dest(package+'/'+html+'/'));
});

gulp.task('cp', function() {
  runSequence(
            'cp:clean',
            // build
            ['styles:b','vendorStyles:b','mainjs:b', 'modernizr:b','vendorjs:b','images','extras','htmlcopy:b'],            
            // developer stack distribution
            ['cp:stack:dist'],
            'cp:stack:clean',
            // Client HTML distribution
            ['htmlcopy'],
            'cp:client:dist',
            // server distribution
            'htmlcopy:b',
            ['cp:server:dist'],
            ['cp:server:style',
            'cp:server:vendorstyle',
            'cp:server:vendorjs'],
            'cp:server:mainjs',
            'cp:server:clean'
            );
});