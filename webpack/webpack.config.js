const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var baseDir = path.join(__dirname, '../');

//auto inject css file in the head of html doc
//https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'index.html',
    filename: 'index.html',
    inject: 'body'
});


module.exports = {
    entry: {
        bundle: [
            //react code bundle and scss input file
            path.join(baseDir, 'js/index.js'),
            path.join(baseDir, 'scss/main.scss')
        ],
        main: [
            //non-react javascript outputted to main.js
            path.join(baseDir, 'js/plugins/ClassModifier.js'),
            path.join(baseDir, 'js/plugins/CustomScroll.js')
        ]
    },
    //only js files are outputted to a script tag
    output: {
        filename: '[name].js'
    },
    //avoids having to use js/jsx extensions in import calls
    //use path.resolve to import files from js folder root
    //http://discuss.babeljs.io/t/es6-import-jsx-without-suffix/172/2
    //https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./js'),
            path.resolve('./node_modules')
        ]
    },
    module: {
        rules: [
            //react/jsx/es6/es7 compilation
            //see .babelrc for babel rules
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            //compile and bundle the css/scss
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
            //read in font awesome fonts and package them
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