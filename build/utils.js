const globby = require('globby')
const { resolve, dirname } = require('path');
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { appDir } = require('./paths')
const isEnvProduction = isProd()
// 是否生厂环境
function isProd() {
    return (process.env.FD_ENV || '').startsWith('production')
}


// 获取多页html模板方法
function getMultiPageHtml(filePath) {
    const files = globby.sync(filePath, {
        expandDirectories: {
            files: ['*.html']
        }
    });

    return files.reduce((arr, file) => {
        let key = file.replace(/(^src\/|\.html$)/g, '');
        return arr.concat([[
            key,                                              // 入口 chunk key（用文件路径可保证key唯一性）
            resolve(appDir, file),                           //html template url
            resolve(appDir, `${dirname(file)}/index.js`)     //入口js文件 url
        ]])
    }, []);
}

function getMultiPageConfig(files) {
    function reduceFunc(data, file) {
        const [fileDirname, template, appJs] = file;
        if (fs.existsSync(appJs)) {
            data.entryJs[fileDirname] = appJs;
            // htmlWebpackPlugin对象列表
            data.htmlPlugins.push(
                new HtmlWebpackPlugin(
                    Object.assign(
                        {},
                        {
                            inject: true,
                            chunks: ['common', 'vendor', 'manifest', fileDirname],
                            template,
                            filename: `${fileDirname}.html`,
                            minify: {
                                removeComments: true,
                                collapseWhitespace: true,
                                removeRedundantAttributes: true,
                                useShortDoctype: true,
                                removeEmptyAttributes: true,
                                removeStyleLinkTypeAttributes: true,
                                keepClosingSlash: true,
                                minifyJS: true,
                                minifyCSS: true,
                                minifyURLs: true,
                            },
                        },

                    )
                )
            )
            // 可访问的页面路径列表
            data.pagePaths.push(`${fileDirname}.html`);
        }
        return data

    }
    return files.reduce(reduceFunc, {
        entryJs: {},
        htmlPlugins: [],
        pagePaths: []
    })
}

// 获取配置文件环境变量
function getEnvs() {
    // 混入参数
    return Object.keys(process.env).reduce((obj, key) => {
        if (key.startsWith('FD_')) {
            obj[key] = JSON.stringify(process.env[key]);
        }
        return obj;
    }, {});
}

module.exports = {
    getMultiPageHtml,
    getEnvs,
    getMultiPageConfig,
    isEnvProduction
}
