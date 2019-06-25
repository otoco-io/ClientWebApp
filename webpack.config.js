const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000, //bytes
                        name: '[hash:7].[ext]',
                        outputPath: 'assets'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/html_templates/index.html'
        }),
    ],
    devServer: {
      contentBase: './dist'
    }
}

module.exports = (env, argv) => {
    config.mode = argv.mode; // development, production
    if (argv.mode === "production") {
        config.output.path = path.resolve(__dirname,'build')
    }
    return config;
};