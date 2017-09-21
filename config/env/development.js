const argv = require('yargs').argv;

// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    dev: true,

    server: {
        port: argv.port || 3400
    },

    webpack: {
        devtool: 'source-map',

        plugins: [
            // new webpack.SourceMapDevToolPlugin({
            //     filename: 'scripts/[name].js.map',
            //     exclude: ['scripts/vendor.js']
            // }),

            new HtmlWebpackPlugin({
                template: '!!ejs-loader!./src/index.html'
            })
        ]
    }
};
