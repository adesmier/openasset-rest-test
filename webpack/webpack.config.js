const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let baseSrcDir    = path.join(__dirname, '../src');
let baseAssetsDir = path.join(__dirname, '../assets');

//https://hackernoon.com/webpack-3-quickstarter-configure-webpack-from-scratch-30a6c394038a

//auto inject css file in the head of html doc
//https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'index.html',
    filename: 'index.html',
    inject: 'body'
});


const devServer = {
    compresss: true,
    port: 3333,
    stats: 'errors-only'
}
const devTool = 'inline-source-map';


module.exports = {
    entry: {
        bundle: [
            //react code bundle and scss (non-modular) input file
            path.join(baseSrcDir, 'jsx/index.js'),
            path.join(baseAssetsDir, 'scss/main.scss')
        ],
        main: [
            //non-react javascript outputted to main.js
            path.join(baseSrcDir, 'js/plugins/ClassModifier.js'),
            path.join(baseSrcDir, 'js/plugins/CustomScroll.js')
        ]
    },
    //only js files are outputted to a script tag
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    //avoids having to use js/jsx extensions in import calls
    //use path.resolve to import files from js folder root
    //http://discuss.babeljs.io/t/es6-import-jsx-without-suffix/172/2
    //https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./src/js'),
            path.resolve('./src/jsx'),
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
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader?importLoaders=1',
            //     })
            // },
            {
                test: /\.(sass|scss)$/,
                exclude: [/node_modules/, /src/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }                   
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                exclude: [/node_modules/, /assets\/scss/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            //read in font awesome fonts and package them
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlWebpackPluginConfig,
        new ExtractTextPlugin({
            filename: '[name]_[contenthash].css',
            allChunks: true
        })
    ]
}
