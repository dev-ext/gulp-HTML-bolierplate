var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var csso = require('gulp-csso');

var app = 'app';
var dist = 'dist';
var src = {
  scss : [app+'/style.scss'],
  vendorStyle:[app+'/vendor.scss']
};

// Style
gulp.task('styles', function () {
  gulp.src(src.scss)    
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(app+'/'))
});

gulp.task('styles:b', function () {
  gulp.src(src.scss)    
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(gulp.dest(dist+'/'))  
    .pipe(csso())    
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(dist+'/')); 
});

// Vendor Style
gulp.task('vendorStyles', function () {
  gulp.src(src.vendorStyle)    
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(app+'/'))
});

gulp.task('vendorStyles:b', function () {
  gulp.src(src.vendorStyle)    
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(gulp.dest(dist+'/'))  
    .pipe(csso())    
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(dist+'/')); 
});

