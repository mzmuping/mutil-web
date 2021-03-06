const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const DedeCMSWebpackPlugin = require('./cms-plugin');
const FileListPlugin = require('./file-list-webpack-plugin');
const {
  getMultiPageHtml,
  getMultiPageConfig,
  isEnvProduction,
} = require('./utils');
const { appDir, srcDir } = require('./paths');
const multiPageList = getMultiPageHtml('src');
const { entryJs, htmlPlugins, pagePaths } = getMultiPageConfig(multiPageList);
fs.writeFileSync(
  path.resolve(appDir, 'page.route.json'),
  JSON.stringify(pagePaths, null, 4)
);
module.exports = {
  // entry:'./index.js',
  entry: entryJs,
  output: {
    // filename: 'static/js/[name].bundle.[contenthash:8].js',
    // chunkFilename: 'static/js/[name].bundle.[contenthash:8].js',
    filename: 'static/js/[name].[hash:8].bundle.js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    clean: true, // 在生成文件之前清空 output 目录
  },
  resolve: {
    alias: {
      '@': appDir,
      src: srcDir,
    },
    extensions: ['.js', '.jsx', '.ts', '.json', '.wasm'],
  },
  externals: {},
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包公共模块
        commons: {
          // initial表示提取入口文件的公共部分
          chunks: 'initial',
          // 表示提取公共部分最少的文件数
          minChunks: 2,
          // 表示提取公共部分最小的大小
          minSize: 0,
          // 提取出来的文件命名
          name: 'commons',
        },
        // 打包第三方库的文件
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        },
      },
    },
    runtimeChunk: { name: 'manifest' }, // 运行时代码
    minimize: isEnvProduction,
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
    ],
  },
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|pdf|opf)$/i,
        type: 'asset', // https://webpack.docschina.org/guides/asset-modules
        generator: {
          // 输出文件名
          filename: 'static/img/[name].[hash][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb dataURL形式
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            // options:{}放在 .babelrc
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
        enforce: 'pre',
      },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
      {
        test: /\.(le|c)ss$/i,
        use: [
          // style-loader 会把css注入js中，MiniCssExtractPlugin 分离css
          isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
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
  plugins: [
    ...htmlPlugins,
    isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    isEnvProduction && new DedeCMSWebpackPlugin(),
    isEnvProduction &&
      new FileListPlugin({
        filename: '文档.md',
      }),
  ].filter(Boolean),
};
