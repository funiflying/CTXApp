'use strict'

var gulp = require('gulp');
var plugins=require('gulp-load-plugins')();
var minifycss=require('gulp-minify-css');
var imagemin=require('gulp-imagemin');
var browserSync = require('browser-sync');

gulp.task('serve', function () {
   var files = [
      './src/**/*.html',
      './src/css/**/*.css',
      './src/images/**/*.png',
      './src/js/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './src/'
      }
   });
});
gulp.task('minify',function(){
	gulp.src(['./src/css/**/*/*.css']).pipe(minifycss()).pipe(gulp.dest('./build/css/'));
	gulp.src(['./src/js/**/*/*.js']).pipe(plugins.uglify()).pipe(gulp.dest('./build/js/'));
	gulp.src(['./src/images/**/*.*']).pipe(imagemin()).pipe(gulp.dest('./build/images/'));
})
gulp.task('inject',function(){
	var injectStyle=gulp.src(['./build/css/**/*.css'],{read: false});
	var indectJs=gulp.src(['./build/js/**/*.js'],{read: false});
	var target=gulp.src('./build/index.html');
	target.pipe(plugins.inject(injectStyle)).pipe(plugins.inject(indectJs)).pipe(gulp.dest('./build'));
})
