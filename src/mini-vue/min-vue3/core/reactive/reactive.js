import { Dep } from '../reactive/dep';

let targetsMap = new Map();
/**
 * 响应对象
 * @param {raw} 一个对象
 *
 */
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      let dep = getDep(target, key);
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      let dep = getDep(target, key);
      let result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  });
}

function getDep(target, key) {
  let depsmap = targetsMap.get(target);

  if (!depsmap) {
    depsmap = new Map();
    targetsMap.set(target, depsmap);
  }

  let dep = depsmap.get(key);
  if (!dep) {
    dep = new Dep();
    depsmap.set(key, dep);
  }
  return dep;
}
