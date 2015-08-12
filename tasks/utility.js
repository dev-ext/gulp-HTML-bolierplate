var gulp = require('gulp');
var del = require('del');

// Gulp Clean
gulp.task('clean', function(){
  del([
    'dist/',
    'app/js',
    'app/style.css',
    'app/vendor.css'
    ])
});
