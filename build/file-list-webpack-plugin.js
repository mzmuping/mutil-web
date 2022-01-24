const path = require('path');
const fs = require('fs')
const { buildDir, appDir } = require('../build/paths')
/**
 * 输出文件列表插件
 * 在其中添加一个markdown文件来显示dist文件下所有的打包文件
 */
class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename
    }

    apply(compiler) {
        let filePath = path.resolve(buildDir, this.filename)
        compiler.hooks.afterEmit.tap('FileListPlugin', (compilation) => {
            const assets = compilation.assets;
            let content = `## 文件列表\r\n|文件名| 资源大小|\r\n|:-----:|-----:|\r\n`;

            Object.entries(assets).forEach(([filename, source]) => {
                content += `|${filename}    |    ${source.size() / (1024 * 1024)}mb|\r\n`;
            })
            fs.writeFileSync(filePath, Buffer.from(content))
        })
    }
}

module.exports = FileListPlugin