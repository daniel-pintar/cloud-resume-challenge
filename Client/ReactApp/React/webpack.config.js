const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = function(webpackEnv) {
    const isEnvDevelopment = webpackEnv.development === true;
    const isEnvProduction = webpackEnv.production === true;

    return {
        target: 'web',
        watch: isEnvDevelopment,
        mode: isEnvProduction ? 'production' : 'development',

        entry: "./src/index.tsx",

        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: "/",
            filename: isEnvProduction ? '[id].[hash].js' : '[name].bundle.js',
            chunkFilename: isEnvProduction ? '[id].[hash].[chunkhash].chunk.js' : '[name].chunk.js',
        },

        devtool: isEnvDevelopment ? "source-map" : false,

        devServer: {
            compress: true,
            port: 9000,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
                https: true
            },
            historyApiFallback: true
        },

        resolve: {
            mainFields: ['browser', 'main', 'module'],
            extensions: ['.ts', '.tsx', '.js']
        },

        module: {
            rules: [

                // we use babel-loader to load our jsx and tsx files
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },

                {
                    test: /\.(css|scss)$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: isEnvProduction ? '[sha512:contenthash:base64]' : '[sha1:contenthash:hex:5]_____[local]'
                                },
                                importLoaders: 2,
                                sourceMap: isEnvDevelopment,
                            }
                        },
                        {
                            loader: "resolve-url-loader",
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },

                {
                    test: /\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "font",
                                publicPath: "/font"
                            }
                        },
                    ],
                },

                {
                    test: /\.(svg|png|jpg|gif|jpeg)(\?.*)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "image",
                                publicPath: "/image"
                            }
                        },
                    ],
                },

                {
                    test: /\.(pdf)(\?.*)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "binary",
                                publicPath: "/binary"
                            }
                        },
                    ],
                }

            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: isEnvProduction ? '[id].[hash].css' : '[name].bundle.css',
            }),
            new HtmlWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: 'src/static', to: '.' },
                ],
            }),
            new Dotenv({
                path: isEnvProduction ? path.join(__dirname, "./.env.automated") : path.join(__dirname, "./.env")
            }),
        ]
    }
};