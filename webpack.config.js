const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ClenWebpackPlugin  = require("clean-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: path.resolve(__dirname, 'dist/'),
        //所有资源的基础路径必须以/结尾
        // publicPath:'/'
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/assets/index.html'
        }),
        new ClenWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $:'jqurey'
        })
    ],
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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //开启CSS模块化
                            module: true,
                            localIndentName: '[name]-[local]_[hash:base64:6]'
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, 'node_module'),
                    path.resolve(__dirname, 'src/assets/css')
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [
                    path.resolve(__dirname, 'node_module'),
                    path.resolve(__dirname, 'src/assets/css')
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //开启CSS模块化
                            module: true,
                            localIndentName: '[name]-[local]_[hash:base64:6]'
                        }
                    },
                    'sass-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_module'),
                    path.resolve(__dirname, 'src/assets/css')
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader','sass-loader'],
                include: [
                    path.resolve(__dirname, 'node_module'),
                    path.resolve(__dirname, 'src/assets/css')
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //开启CSS模块化
                            module: true,
                            localIndentName: '[name]-[local]_[hash:base64:6]'
                        }
                    },
                    'less-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_module'),
                    path.resolve(__dirname, 'src/assets/css')
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader','less-loader'],
                include: [
                    path.resolve(__dirname, 'node_module'),
                    path.resolve(__dirname, 'src/assets/css')
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        //图片大小限制是否使用base64
                        limit: 10000,
                        name:'assets/images/[name]_[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'assets/fonts/[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    //配置webserver
    devServer: {
        //自动打开浏览器
        open: true,
        port: 9000,
        contentBase:'./src/assets',
        //服务器打包后资源输出的路径
        publicPath:'/'
    }
}