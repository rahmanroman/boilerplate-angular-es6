const argv = require('yargs').argv;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

module.exports = {
    dev: false,

    server: {
        port: argv.port || 8080
    },

    webpack: {
        output: {
            filename: 'scripts/[name].[hash].js'
        },

        plugins: [
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
        ]
    }
};
