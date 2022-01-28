const pxRegExp = /\b(\d+(\.\d+)?)px\b/;
function getTargeTran(ast) {

    if (!ast) return;
    // console.log(JSON.stringify(ast, null, 2))

    let rules = ast.stylesheet.rules
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i]
        for (let j = 0; j < rule.declarations.length; j++) {
            const declaration = rule.declarations[j];
            if (declaration.value && pxRegExp.test(declaration.value)) {
                declaration.value = '75rem'
            }
        }
    }

    return ast
}

module.exports = {
    getTargeTran
}