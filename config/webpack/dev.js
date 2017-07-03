const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {
    CheckerPlugin
} = require('awesome-typescript-loader');
const share = require('./share');

const config = {
    devtool: 'source-map',
    output: {
        path: path.resolve('../main/resources/static/build'),
        publicPath: '/static/build/',
        filename: 'js/[name].js',
        pathinfo: true
    },
    devServer: {
        contentBase: path.resolve('../main/resources/static'),
        port: 9000,
        setup: app => {
            app.use('/static', (req, res, next) => {
                req.url = req.url.replace('/static', '');
                next();
            });

            app.get(/^\/(?!(api|v1|authentication|static))/, (req, res) => {
                console.log(req.url);
                res.sendFile(path.resolve('../main/resources/templates/index.html'));
            });
        },
        proxy: {
            '/v1': 'http://192.168.199.118:7070',
            '/api': 'http://192.168.199.118:7070',
            '/authentication': 'http://192.168.199.118:7070'
        }
    }
};

const plugins = [
    new HtmlWebpackPlugin({
        template: 'templates/index.pug',
        filename: 'index.html',
        alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve('../main/resources/templates')
    }),
    new ManifestPlugin({
        fileName: '../manifest.json'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('development')
        }
    })
];

share.plugins.push(...plugins);

module.exports = Object.assign({}, share, config);
