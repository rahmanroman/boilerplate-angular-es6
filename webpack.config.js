const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const config = require('./config');
const pkg = require('./package.json');

const noop = (() => {
});

const rules = [
    {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
            loader: 'ng-annotate-loader'
        }, {
            loader: 'babel-loader',
            // options: pkg.babel
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
                        config.dev ? noop : require('cssnano')()
                    ]
                }
            }, {
                loader: 'sass-loader',
                options: {
                    includePaths: [path.join(config.path.src, 'styles')]
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
    },

    {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 1024 * 4,
                    name: config.dev ? 'assets/images/[name].[ext]' : 'assets/images/[name].[hash].[ext]',
                    fallback: 'file-loader'
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: false
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false
                    }
                }
            }
        ]
    }
];

const plugins = [
    // Common plugins section
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

    new ExtractTextPlugin('styles/style.css'),

    new webpack.optimize.ModuleConcatenationPlugin()
].concat(config.dev
    // Development plugins section
    ? [
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!./src/index.html'
        })
    ]

    // Production plugins section
    : [
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!./src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new UglifyJSPlugin({
            parallel: true
        }),

        new StyleExtHtmlWebpackPlugin()
    ]);

module.exports = {
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
            path.join(config.path.src, 'scripts/app.js')
        ]
    },

    output: {
        path: path.join(config.path.dest),
        filename: config.dev ? 'scripts/[name].js' : 'scripts/[name].[chunkhash].js',
        publicPath: '/'
    },

    resolve: {
        modules: [
            'node_modules',
            path.join(config.path.src, 'scripts'),
            path.join(config.path.src, 'styles')
        ]
    },

    module: {
        rules: rules
    },

    plugins: plugins,

    devtool: config.dev ? 'source-map' : false
};
