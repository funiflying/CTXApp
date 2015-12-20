'use strict'

var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
   var files = [
      '/**/*.html',
      '/css/**/*.css',
      '/images/**/*.png',
      '/js/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});
