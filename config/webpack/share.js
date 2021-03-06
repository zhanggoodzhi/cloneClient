const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    entry: {
        app: [
            './src/vendor/index.ts',
            './src/index.tsx'
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.resolve('src/app'),
            path.resolve('src/app/redux'),
            'node_modules'
        ],
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        useCache: true,
                        useBabel: true
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.less$/,
                include: path.resolve('./src/app'),
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importuse: 2,
                                localIdentName: '[local]___[hash:base64:5]',
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: [
                                    cssnano({
                                        safe: true
                                    }),
                                    autoprefixer({
                                        browsers: ['> 1%', 'ie >= 9', 'not ie <= 8']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                strictMath: true,
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                exclude: path.resolve('./src/app'),
                use: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                })
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }, {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?.*)?$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css')
    ]
};
