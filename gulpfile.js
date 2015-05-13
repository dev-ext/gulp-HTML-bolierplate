/*global -$ */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var inquirer = require('inquirer');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync');
var del = require('del');
var reload = browserSync.reload;

// variables
var production = !!(argv.production);  
var dev = !!(argv.dev);  
var move = !!(argv.move); 

var src = {
	scss : 'app/style.scss',  
  scripts:{
  modernizr:'bower_components/modernizr/modernizr.js',
  vendor:['bower_components/jquery/dist/jquery.js',
  'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
  ],
  main:'app/scripts/main.js'
  }
};

gulp.task('styles', function () {
  return gulp.src(src.scss)    
    .pipe(gulpif(dev,$.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(gulpif(dev,$.sourcemaps.write()))
    .pipe(gulpif(dev,gulp.dest('app/')))
    .pipe(gulpif(production,csso()))
    .pipe(gulpif(production,gulp.dest('dist/')))
    .pipe(reload({stream: true}));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

// Lint JS
gulp.task('lint', function() {
  return gulp.src('app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Main Js
gulp.task('mainScripts', function(){
  return gulp.src(src.scripts.main)
    .pipe(concat('main.js'))    
    .pipe(gulpif(dev,gulp.dest('app/js/')))
    .pipe(gulpif(production,gulp.dest('app/js/')))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulpif(dev,gulp.dest('app/js/')))
    .pipe(gulpif(production,gulp.dest('dist/js/')));
});

// Vendor js
gulp.task('vendorScripts', function(){
  return gulp.src(src.scripts.vendor)
    .pipe(concat('vendor.js'))    
    .pipe(gulpif(dev,gulp.dest('app/js/vendor/')))
    .pipe(gulpif(production,gulp.dest('app/js/vendor/')))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulpif(dev,gulp.dest('app/js/vendor/')))
    .pipe(gulpif(production,gulp.dest('dist/js/vendor/')));
});


// modernizr
gulp.task('modernizr', function(){
  return gulp.src(src.scripts.modernizr)   
    .pipe(uglify())
    .pipe(gulpif(dev,gulp.dest('app/js/vendor/')))
    .pipe(gulpif(production,gulp.dest('dist/js/vendor/')));
});



// HTML and  others Copy
gulp.task('htmlCopy',function(){
  var opts = {
    conditionals: true,
    spare:true
  };
 return gulp.src(['app/*.html'])
 .pipe(gulpif(production,minifyHTML(opts))) 
 .pipe(gulp.dest('dist'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    '!app/*.scss'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});



gulp.task('serve', ['styles','modernizr','vendorScripts','mainScripts'], function () {
  browserSync({
    notify: false,
    port: 9000,
     server: {
      baseDir: ['app'],      
      routes: {
        '/bower_components': 'bower_components'
      },
    },
    open: "external",
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
  ]).on('change', reload);

  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['mainScripts']);
});

gulp.task('clean', function(){
  del([
    'dist/',
    'app/js',
    'app/style.css'
    ])
});

gulp.task('build',['modernizr','vendorScripts','mainScripts','styles','images','extras','htmlCopy'],function(){
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default',['clean'],function(){
console.log('Check readme.md');
});