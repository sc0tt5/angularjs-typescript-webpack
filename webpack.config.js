const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

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
                    sourcemap: process.env.NODE_ENV !== 'production'
                }
            },
            {
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'src') + '/tsconfig.app.json',
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
        template: path.resolve(__dirname, 'src') + '/index.html'
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

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        /* new webpack.NormalModuleReplacementPlugin(
            /\/environments\/environment\.ts/,
            path.resolve(__dirname, 'src') + '/environments/environment.prod.ts'
        ), */
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    );
} else {
    plugins.push(
        new webpack.NamedModulesPlugin()
        // new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = {
    mode: 'development',
    cache: true,
    context: __dirname,
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
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
    devtool: 'sourcemap',
    entry: {
        app: path.resolve(__dirname, 'src') + '/main.ts'
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
        ]
    },
    output: {
        filename: '[name].bundle.[hash:4].js',
        chunkFilename: '[name]-chunk.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'build')
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
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins
};
