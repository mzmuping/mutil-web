const path = require('path');
const { appDir } = require('./paths');
const MyBabelLoader = path.resolve(appDir, 'loader/my-babel-loader.js');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist-loader'),
    filename: 'main.js',
  },
  resolve: {
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: MyBabelLoader,
            options: {
              modules: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
    ],
  },
};
