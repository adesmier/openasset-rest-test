const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var baseDir = path.join(__dirname, '../');
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'index.html',
    filename: 'index.html',
    inject: 'body'
});


module.exports = {
    entry: {
        bundle: [
            path.join(baseDir, 'js/index.js'),
            path.join(baseDir, 'scss/main.scss')
        ],
        main: [
            path.join(baseDir, 'js/plugins/ClassModifier.js'),
        ]
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?importLoaders=1',
                })
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        htmlWebpackPluginConfig,
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
}