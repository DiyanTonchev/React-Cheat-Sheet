// jshint esversion: 6
let debug = process.env.NODE_ENV !== 'production';
let webpack = require('webpack');
let path = require('path');

module.exports = {
    context: path.join(__dirname),
    devtool: debug ? 'inline-sourcemap' : null,
    entry: './src/js/client.js',
    output: {
        path: __dirname + '/src/',
        filename: 'client.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.js$/,
                exclude: /(node_models|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
};