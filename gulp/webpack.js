const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');

const WEBPACK_CONFIG = config.webpack;

WEBPACK_CONFIG.plugins = WEBPACK_CONFIG.plugins.concat([
    new ExtendedDefinePlugin({
        CONFIG: {
            environment: config.environment,
            dev: config.dev,
            angular: config.angular
        }
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),

    new ExtractTextPlugin('styles/style.css')
]);

const WEBPACK_OUTPUT = {
    colors: true,
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
        // if (err) {
        //     throw new gutil.PluginError('webpack', err);
        // }
        //
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
