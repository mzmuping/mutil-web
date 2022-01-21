const { resolve } = require('path')
const appDir = resolve(process.cwd())
module.exports = {
    appDir,
    srcDir: resolve(appDir, 'src'),
    buildDir: resolve(appDir, 'dist'),
}