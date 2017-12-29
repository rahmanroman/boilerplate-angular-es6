const path = require('path');
const argv = require('yargs').argv;
const merge = require('lodash.merge');

const environment = (argv.environment || process.env.NODE_ENV || 'development');
const envConfig = require(`./env/${environment}`);

const PATH_SRC = '../src';
const PATH_DEST = '../public';

const commonConfig = {
    environment: environment,

    path: {
        src: path.join(__dirname, PATH_SRC),
        dest: path.join(__dirname, PATH_DEST)
    },

    server: {
        proxy: {
            'https://jsonplaceholder.typicode.com': {
                routes: [
                    '/jsonplaceholder/api'
                ],

                pathRewrite: {
                    '^/jsonplaceholder/api/': '/'
                },

                headers: {
                    'Authorization': 'Bearer 1234567890ABCDEF'
                }
            }
        }
    },

    angular: {
        module: 'angular.app'
    }
};

let config = merge({}, commonConfig, envConfig);

module.exports = config;
