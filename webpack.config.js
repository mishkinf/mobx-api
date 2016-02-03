var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    devtool: 'source-map',
    output: {
        libraryTarget: 'umd',
        library: 'api-know',
        filename: 'dist/api-know.js'
    }
}