const cssAst = require('css')
const { getTargeTran } = require('./utils')
module.exports = function (source) {

    console.log('source========', source)
    const oldStytle = cssAst.parse(source)
    const newAst = getTargeTran(oldStytle)
    console.log(JSON.stringify(newAst, null, 2))
    const cssSoure = cssAst.stringify(newAst)
    return cssSoure
}
