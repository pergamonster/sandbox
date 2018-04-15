const webpack = require('webpack');
const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: {
        child: ['babel-polyfill', './src/javascript/child/index.js'],
        parent: ['babel-polyfill', './src/javascript/parent/parent.js'],
    },
    output: {
        filename: './[name]_bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets:['es2015', 'react']}},
            { test: /\.svg$/, use: [ {loader: 'svg-sprite-loader'} ] },
            { test: /\.less$/, 
                use: [
                 { loader: 'style-loader' },
                 { loader: 'css-loader' },
                 { loader: 'less-loader', options: {paths: [path.resolve(__dirname, "node_modules")]} }
                 
                 ]
            },
            { test: /\.css$/, 
                use: [
                 { loader: 'style-loader' },
                 { loader: 'css-loader'} 
                
                 ]
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.eot$/, loader: 'file-loader' },
            { test: /\.ttf$/, loader: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery"
            }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new SpriteLoaderPlugin()

    ]
};
