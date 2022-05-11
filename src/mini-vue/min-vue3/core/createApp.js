import { effectWatch } from './reactive/dep';
import { mountElement, diff } from './renderer';

export const createApp = (rootComponent) => {
    return {
        mount(rootContain) {
            let context = rootComponent.setup();
            let isMouted = false;
            let preSubTree; // 旧节点
            effectWatch(() => {
                if (!isMouted) {
                    isMouted = true;
                    let subTree = rootComponent.render(context);
                    mountElement(subTree, rootContain);
                    preSubTree = subTree;
                } else {
                    let subTree = rootComponent.render(context);
                    diff(preSubTree, subTree);
                    preSubTree = subTree;
                }
            });
        },
    };
};
