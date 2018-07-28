const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const path = require('path');
const srcDir = path.resolve( __dirname, '../src' );
const publicDir = path.resolve( __dirname, '../public' );

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
    context: srcDir,
    entry: './index.js',
    output: {
        path: publicDir,
        publicPath: './',
        filename: 'main.js',
        sourceMapFilename: 'main.map'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use : [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: IS_DEV,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: IS_DEV }
                        },
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {sourceMap: IS_DEV}
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: IS_DEV,
                                modules: true,
                                localIdentName: IS_DEV ? '[local]':'[local]__[hash:base64:5]',
                            }   
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: IS_DEV }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: IS_DEV }
                        }
                    ]
                })
            },
            
            {
                test    : /\.pug$/,
                use     : ['html-loader','pug-html-loader']
            },

            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                query: {
                    plugins:[ 'transform-object-rest-spread' ]
                }
            },

            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            },

            {
                test    : /\.(png|jpg|svg|ttf|woff|woff2)$/,
                use     : 'file-loader'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('[name].css').replace('css/js', 'css');
            },
            disable: IS_DEV,
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new FaviconsWebpackPlugin('./assets/logo.png')
    ]
};