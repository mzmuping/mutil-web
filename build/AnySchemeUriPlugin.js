"use strict";

const node_url = require("url");

class AnySchemeUriPlugin {

    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(
            "AnySchemeUriPlugin",
            (compilation, { normalModuleFactory }) => {
                Array.from(this.options.schemes).forEach(scheme => {
                    normalModuleFactory.hooks.resolveForScheme
                        .for(scheme)
                        .tap("AnySchemeUriPlugin", resourceData => {
                            const uri = resourceData.resource.replace(`${scheme}://`, 'file://');
                            const url = new node_url.URL(uri);
                            const path = node_url.fileURLToPath(url);
                            const query = url.search;
                            const fragment = url.hash;
                            resourceData.path = path;
                            resourceData.query = query;
                            resourceData.fragment = fragment;
                            resourceData.resource = path + query + fragment;
                            return true;
                        });
                });
            }
        );
    }
}

module.exports = AnySchemeUriPlugin;