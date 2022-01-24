/**
 * 将html文件转换到成织梦系统模板插件
 */
const fs = require('fs');
const path = require('path');
const { getMultiPageHtml } = require('./utils');

// 不需要内容替换的文件
const notReplaceExtname = ['.JPEG', '.JPG', '.PNG', '.GIF', '.ICO', '.BMP',
    '.SVG', '.PCX', '.TIF', '.TGA', '.EXIF', '.FPX', '.PSD', '.CDR',
    '.PCD', '.DXF', '.UFO', '.EPS', '.AI', '.HDRI', '.RAW', '.WMF',
    '.FLIC', '.EMF', '.EOT', '.TTF', '.WOFF', '.WOFF2']
class DedeCMSWebpackPlugin {

    config = {
        originStaticFileMatch: '', // 静态文件原路径匹配
        publicPath: '', // 公共路径
        jsInnerPathOffset: '', // js内静态文件动态载入文件相对公共路径偏移
        cssInnerPathOffset: '', // css内静态文件动态载入文件相对公共路径偏移
        staticDirname: 'static',
        buildDirname: 'dist',
        notReplaceExtname,
        matchFileExtname: [...notReplaceExtname, '.JS', '.CSS', '.HTML', '.HTM'],
    }

    buildRootDir = ''

    constructor(opts = {}) {
        this.config = {
            ...this.config,
            ...opts,
        }
        this.buildRootDir = path.resolve(process.cwd(), this.config.buildDirname);
    }

    apply(compiler) {
        compiler.hooks.done.tap('DedeCMSWebpackPlugin', () => {
            const { buildDirname } = this.config;
            const htmlList = getMultiPageHtml(buildDirname).map(([_, template]) => template);
            htmlList.forEach(template => this.replaceContent(template));
        });
    }

    // 替换内容
    replaceContent(template) {
        const { staticDirname, matchFileExtname } = this.config
        // 不需要替换
        const exts = matchFileExtname.map(([_, ...strList]) => strList.join('')).join('|');
        const tempExt = path.extname(template).toLocaleUpperCase();
        const buildRootDir = this.buildRootDir;
        const templateName = path.dirname(template).split(path.sep).pop()
        if (fs.existsSync(template)) {
            let dataStr = fs.readFileSync(template).toString()
            let pathMatch = dataStr.match(new RegExp(`["']?[^"'<>\\s\(\)]*?${staticDirname}[^"'<>\\s\(\)]*?\\.(${exts})`, 'ig'));
            if (pathMatch) {
                pathMatch
                    .map(t => t.substr(1))
                    .map(t => {
                        return path.resolve(this.buildRootDir, `.${t}`)
                    })
                    .forEach((t) => {
                        return this.replaceContent(t)
                    });
            }
            dataStr = dataStr.replace(/(["'])?\/?static\//ig, '$1http://localhost:8080/static/');
            let filedir = path.resolve(process.cwd(), buildRootDir)
            if (tempExt === '.HTML') {
                if (template.includes('mobile')) {

                    fs.writeFileSync(path.resolve(filedir, `${templateName}_m.htm`), Buffer.from(dataStr))
                } else if (template.includes('pc')) {
                    fs.writeFileSync(path.resolve(filedir, `${templateName}.htm`), Buffer.from(dataStr))

                }
            } else {

            }

        } else {
            console.log('没有=====', template)
        }
    }
}


module.exports = DedeCMSWebpackPlugin
