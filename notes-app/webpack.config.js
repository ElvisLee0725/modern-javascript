const path = require('path')

module.exports = {
    entry: {
        index: ['babel-polyfill', './src/index.js'],
        edit: ['babel-polyfill', './src/edit.js']
    },
    // The path name could be different between OS systems and people's personal computers, so we use path to solve it
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}