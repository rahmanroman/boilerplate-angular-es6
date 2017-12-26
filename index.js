const http = require('http');
const connect = require('connect');

const config = require('./config');
const pkg = require('./package.json');

process.on('uncaughtException', (err) => {
    console.error(err);
});

const app = connect();

[
    require('helmet')(),
    require('./backend/proxy'),
    require('./backend/static'),
    require('./backend/history-api')
].map(function (middleware) {
    app.use(middleware);
});

http.createServer(app).listen(config.server.port, '0.0.0.0');

console.info(`${pkg.name}/${pkg.version} started on port ${config.server.port}`);
