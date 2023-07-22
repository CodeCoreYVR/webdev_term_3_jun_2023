const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: "development",
    entry: "./src/components/App.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};