const serveStatic = require('serve-static');

const pkg = require('../package.json');
const config = require('../config');

const server = serveStatic(config.path.dest, {
    index: 'index.html',
    maxAge: '7d',
    setHeaders: function (res) {
        res.setHeader('X-Server-Info', `${pkg.name}/${pkg.version}`);
    }
});

module.exports = function (req, res, next) {
    server(req, res, next);
};
