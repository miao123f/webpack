const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ClenWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BomPlugin = require('webpack-utf8-bom');


var isProduction = function () {
    return process.env.NODE_ENV === 'production';
}


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './web'),
        //所有资源的基础路径必须以/结尾
        publicPath:'/',
        filename: !isProduction() ? 'assets/js/[name]-main.js' : 'assets/js/[name]-main-[hash:6].js',
        chunkFilename: 'assets/js/[name]-[chunkhash:8]-chunk.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                }),

            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        //图片大小限制是否使用base64
                        limit: 1024,
                        name: 'assets/images/[name]_[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name]_[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            'node_modules',
            path.resolve(__dirname, './src/libs'),
        ],
        // alias: {
        //     layer: path.resolve(__dirname, './node_modules/layer/src/mobile/layer'),
        //     layercss: path.resolve(__dirname, './node_modules/layer/src/mobile/need/layer.css')
        // }
    },
    plugins: [
        new ExtractTextPlugin(!isProduction() ? 'assets/css/[name]-main.css' : 'assets/css/[name]-main-[contenthash:6].css'),
        //解决中文乱码的问题
        new BomPlugin(true, /\.(html)$/),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/assets/index.html'
        }),
        new ClenWebpackPlugin(
            ['css/*.*', 'js/*.*','images/*.*'], 　 //匹配删除的文件
            {
                root: path.resolve(__dirname, './web/assets'),//根目录
                verbose: true,//开启在控制台输出信息
                dry: false,//启用删除文件,
                exclude:[],
                watch:true
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jqurey'
        })
    ],
    //配置webserver
    // devServer: {
    //     //自动打开浏览器
    //     open: true,
    //     port: 9000,
    //     contentBase: './src/assets',
    //     //服务器打包后资源输出的路径
    //     publicPath: '/'
    // }
    devtool: "source-map"
}