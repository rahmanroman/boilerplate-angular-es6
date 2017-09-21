"use strict";

const gulp = require('gulp');
const clean = require('gulp-clean');

// require('./gulp/assets');
// require('./gulp/build');
require('./gulp/webpack');
require('./gulp/serve');
// require('./gulp/scripts');
// require('./gulp/styles');
require('./gulp/watch');

gulp.task('default', ['build'], function () {
});

gulp.task('build', ['webpack'/*, 'styles', 'assets'*/]);

gulp.task('clean', function () {
    return gulp.src('./public/**/*', {read: false})
        .pipe(clean());
});

gulp.task('config', function () {
    console.log(require('./config'));
});
