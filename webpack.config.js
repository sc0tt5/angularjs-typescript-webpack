const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const sourcePath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    const rules = [
        {
            test: /\.html$/,
            loader: 'html-loader',
            options: { minimize: true }
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader']
        },
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'resolve-url-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ng-annotate-loader',
                    options: {
                        ngAnnotate: 'ng-annotate-patched',
                        sourcemap: !isProd
                    }
                },
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFile: `${sourcePath}/tsconfig.app.json`,
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true
                    }
                }
            ]
        }
    ];

    const plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebPackPlugin({
            template: `${sourcePath}/index.html`
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:4].css',
            chunkFilename: '[id].[contenthash:4].css'
        }),
        new ForkTsCheckerWebpackPlugin({
            tslint: true,
            checkSyntacticErrors: true
        })
    ];

    if (isProd) {
        plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /\/environments\/environment\.ts/,
                `${sourcePath}/environments/environment.prod.ts`
            ),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        );
    } else {
        plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        );
    }

    const config = {
        mode: 'development',
        cache: true,
        context: __dirname,
        devServer: {
            contentBase: distPath,
            historyApiFallback: true,
            hot: true,
            stats: {
                chunks: false,
                chunkModules: false,
                chunkOrigins: false,
                errors: true,
                errorDetails: false,
                hash: false,
                timings: false,
                modules: false,
                warnings: false
            },
            publicPath: '/build/',
            port: 3000
        },
        entry: {
            app: `${sourcePath}/main.ts`
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    chunkFilter: chunk => {
                        // Exclude uglification for the `vendor` chunk
                        if (chunk.name === 'vendor') {
                            return false;
                        }
                        return true;
                    },
                    uglifyOptions: {
                        compress: {
                            unused: true,
                            dead_code: true,
                            drop_debugger: true,
                            conditionals: true,
                            evaluate: true,
                            drop_console: true,
                            sequences: true,
                            booleans: true
                        },
                        comments: false,
                        sourceMap: true,
                        beautify: false,
                        ie8: false,
                        mangle: true
                    }
                })
            ],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        output: {
            filename: '[name].bundle.[hash:4].js',
            chunkFilename: '[name].bundle.[hash:4].js',
            publicPath: '/',
            path: distPath
        },
        node: {
            console: false,
            global: true,
            process: true,
            Buffer: false,
            setImmediate: false
        },
        module: {
            rules
        },
        resolve: {
            extensions: ['.js', '.ts'],
            modules: [sourcePath, 'node_modules']
        },
        plugins
    };

    if (!isProd) {
        config.devtool = 'source-map';
    }

    return config;
};
