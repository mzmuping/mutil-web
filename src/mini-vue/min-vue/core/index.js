import { effectWatch } from './reactive/dep';
import { mountElement, diff } from './renderer';
export { ref } from './reactive/ref';
export { reactive } from './reactive/reactive';
export { effectWatch };
export function createAppp(rootComponent) {
  return {
    mount(rootContain) {
      let context = rootComponent.setup();
      let isMouted = false;
      let preSubTree;
      effectWatch(() => {
        if (!isMouted) {
          isMouted = true;
          rootContain.innerHTML = '';
          let subTree = rootComponent.render(context);
          mountElement(subTree, rootContain);
          preSubTree = subTree;
        } else {
          let subTree = rootComponent.render(context);
          diff(preSubTree, subTree);
          preSubTree = subTree;
        }

        // rootContain.append(rootEle);
      });
    },
  };
}
