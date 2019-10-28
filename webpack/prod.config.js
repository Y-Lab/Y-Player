/* eslint-disable no-undef */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = {
    mode: 'production',
    bail: true,
    devtool: 'hidden-source-map',
    entry: {
        player: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].min.js',
        library: 'Player',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.scss']
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: path.resolve(__dirname, '../src/js')
            },
            {
                test: /\.js$/,
                use: [
                    'template-string-optimize-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            compact: true,
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 40000
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.art$/,
                loader: 'art-template-loader'
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            Y_PLAYER_VERSION: `"${require('../package.json').version}"`
        }),
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        }),
        new CssoWebpackPlugin()
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
