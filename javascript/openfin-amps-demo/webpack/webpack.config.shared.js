const webpack = require('webpack');

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
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.svg$/, loader: 'file-loader' },
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
