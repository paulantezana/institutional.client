const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.common.js');
const path = require('path');

const srcDir = path.resolve( __dirname, '../src' );
const publicDir = path.resolve( __dirname, '../public' );

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase : publicDir,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        // port: PORT,
        // host: HOST,

        compress    : true,
        port        :  process.env.PORT||3001,
        open        : true,
        // stats       : 'errors-only',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(srcDir, 'index.pug'),
            filename    : 'index.html',
            minify      : {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new webpack.NamedModulesPlugin(),
    ]
});