const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        child: ['./src/child/index.js'],
        parent: ['./src/parent/parent.js'],
        analytics: ['./src/parent/analytics/analytics.js']
    },
    output: {
        filename: './[name]_bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            {
                test: /\.less$/,

                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader', options: { paths: [path.resolve(__dirname)] } }

                ]
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.svg$/, loader: 'file-loader' },
            { test: /\.eot$/, loader: 'file-loader' },
            { test: /\.ttf$/, loader: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
            //{ test: /\.json$/, loader: 'json-loader' }
        ]
    },
    resolve: {
        extensions: ['*', '.js'],
        alias: {
            d3: '/node_modules/d3fc/site/dist/lib/d3.min.js'
        }
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
