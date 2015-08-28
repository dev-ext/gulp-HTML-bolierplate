// Create config.package 
var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var zip = require('gulp-zip');
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

gulp.task('cp:server:mainjs',function(){
 return gulp.src(config.package+'/'+config.server+'/js/main.min.js')
 .pipe(concat('main.js')) 
 .pipe(uglify())
 .pipe(gulp.dest(config.package+'/'+config.server+'/js/'));
});
gulp.task('cp:server:vendorjs',function(){
 return gulp.src(config.package+'/'+config.server+'/js/vendor/vendor.min.js')
 .pipe(concat('vendor.js')) 
 .pipe(uglify())
 .pipe(gulp.dest(config.package+'/'+config.server+'/js/vendor/'));
});

gulp.task('cp:server:clean', function(){
  del([
    config.package+'/'+config.server+'/style.min.css',
    config.package+'/'+config.server+'/vendor.min.css',
    config.package+'/'+config.server+'/js/main.min.js',
    config.package+'/'+config.server+'/js/vendor/vendor.min.js'
    ])
});


// Create Zip 
gulp.task('cp:zip', function () {
    return gulp.src([config.package+'/**/*.*',
        '!'+config.package+'/'+config.server+'/**/*.*'
        ])
        .pipe(zip(config.package+'.zip'))
        .pipe(gulp.dest(''));
});
// Create Dev Stack
gulp.task('cp:stack:dist',function(){
 return gulp.src(['**/*.*',
    '!bower_components/**/*.*',
    '!node_modules/**/*.*',
    '!'+config.app+'/images/**/*.*',
    '!tasks/package.js',       
    '!'+config.package+'/**/*.*',
    '!'+config.dist+'/**/*.*',
    '!'+config.package+'.zip',
    '!.git/**/*.*'])
 .pipe(gulp.dest(config.package+'/'+config.stack+'/'));
});

// Create HTMl Dist
gulp.task('cp:client:dist',function(){
 return gulp.src([config.dist+'/**/*.*'])
 .pipe(gulp.dest(config.package+'/'+config.client+'/'));
});

// remove unwanted file distribution
gulp.task('cp:utd', function(){
  del([
    config.package+'/'+config.stack+'/tasks/package.js',
    ])
});

gulp.task('cp', function() {
  runSequence(
            // Build
            ['styles:b','vendorStyles:b','mainjs:b', 'headjs:b','vendorjs:b','images','extras','htmlcopy:b'],
            // server upload for demo
            ['cp:server:dist'],
            ['cp:server:style','cp:server:vendorstyle','cp:server:mainjs','cp:server:vendorjs'],
            'cp:server:clean',
            //developer stack distribution
            ['cp:stack:dist'],
            // build file distribution 
            ['htmlcopy'],
            ['cp:client:dist'],
            // create Zip
            'cp:zip'
            );
});