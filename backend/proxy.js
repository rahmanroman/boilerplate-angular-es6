const proxy = require('http-proxy-middleware');

const config = require('../config');

const proxies = Object.keys(config.server.proxy || {}).map(function (host) {
    let routes = config.server.proxy[host].routes;
    let headers = config.server.proxy[host].headers;
    let pathRewrite = config.server.proxy[host].pathRewrite;

    return proxy(routes, {
        target: host,
        changeOrigin: true,
        logLevel: config.dev ? 'debug' : 'silent',
        pathRewrite: pathRewrite,
        xfwd: true,

        onProxyReq: function (proxyReq/*, req, res*/) {
            if (headers) {
                for (let header in headers) {
                    proxyReq.setHeader(header, headers[header]);
                }
            }
        }
    });
});

module.exports = proxies;
