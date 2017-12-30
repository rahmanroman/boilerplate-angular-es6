"use strict";

const gulp = require('gulp');
const clean = require('gulp-clean');

require('./gulp/webpack');
require('./gulp/serve');
require('./gulp/watch');

const config = require('./config');

gulp.task('default', ['build'], function () {
});

gulp.task('build', ['webpack']);

gulp.task('clean', function () {
    return gulp.src(config.path.dest, {read: false})
        .pipe(clean());
});
