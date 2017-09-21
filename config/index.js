const path = require('path');
const argv = require('yargs').argv;
const merge = require('lodash.merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const environment = (argv.environment || process.env.NODE_ENV || 'development');
const envConfig = require(`./env/${environment}`);

const pkg = require('../package.json');

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
                pathRewrite: {
                    '^/jsonplaceholder/api/': '/'
                },

                routes: [
                    '/jsonplaceholder/api'
                ],

                headers: {
                    'Authorization': 'Bearer 1234567890ABCDEF'
                }
            }
        }
    },

    angular: {
        module: 'angular.app'
    },

    webpack: {
        entry: {
            vendor: [
                'angular',
                'angular-animate',
                'angular-resource',
                'angular-sanitize',
                'angular-ui-router',
                'ngstorage'
            ],
            app: [
                path.join(__dirname, PATH_SRC, 'scripts/app.js')
            ]
        },

        output: {
            path: path.join(__dirname, PATH_DEST),
            filename: 'scripts/[name].js',
            publicPath: '/'
        },

        resolve: {
            modules: [
                'node_modules',
                path.join(__dirname, PATH_SRC, 'scripts'),
                path.join(__dirname, PATH_SRC, 'styles')
            ]
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'ng-annotate-loader'
                    }, {
                        loader: 'babel-loader',
                        options: pkg.babel
                    }]
                },

                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')(),
                                    require('cssnano')()
                                ]
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.join(__dirname, PATH_SRC, 'styles')]
                            }
                        }]
                    })
                },

                {
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }]
                }
            ]
        }
    }
};

let config = merge({}, commonConfig, envConfig);

module.exports = config;
