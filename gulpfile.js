"use strict";

const gulp = require('gulp');
const clean = require('gulp-clean');

require('./gulp/webpack');
require('./gulp/serve');
require('./gulp/watch');

gulp.task('default', ['build'], function () {
});

gulp.task('build', ['webpack']);

gulp.task('clean', function () {
    return gulp.src('./public/**/*', {read: false})
        .pipe(clean());
});

gulp.task('config', function () {
    console.log(require('./config'));
});
