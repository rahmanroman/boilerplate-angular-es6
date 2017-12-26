const gulp = require('gulp');

const browserSync = require('browser-sync');
const browserSyncSpa = require('browser-sync-spa');

const config = require('../config');

gulp.task('serve', ['watch'], function () {
    browserSync.use(browserSyncSpa({
        selector: '[ng-app]'
    }));

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: {
            baseDir: config.path.dest,
            middleware: [].concat(
                require('../backend/proxy'),
                require('../backend/history-api')
            )
        },
        files: [
            config.path.dest
        ],
        browser:
            'default',

        port:
        config.server.port,

        ui: {
            port: config.server.port + 1
        }
    });
});
