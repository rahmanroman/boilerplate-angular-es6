const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');

const WEBPACK_CONFIG = require('../webpack.config');

const WEBPACK_OUTPUT = {
    colors: false,
    hash: false,
    version: false,
    timings: true,
    assets: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: true,
    chunkOrigins: false
};

gulp.task('webpack', function (cb) {
    webpack(WEBPACK_CONFIG, function (err, stats) {
        gutil.log('[webpack]', stats.toString(WEBPACK_OUTPUT));
        cb();
    });
});

gulp.task('webpack:watch', function () {
    webpack(Object.assign({}, WEBPACK_CONFIG, {
        watch: true,
        cache: true
    }), function (err, stats) {
        gutil.log('[webpack]', stats.toString(WEBPACK_OUTPUT));
    });
});
