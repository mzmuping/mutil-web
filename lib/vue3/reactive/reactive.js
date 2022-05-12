import { isObject, hasChanged, isArray } from '../utils';
import { track, trigger } from './effect';

const proxysMap = new WeakMap();
export function reactive(target) {
  if (!isObject(target)) {
    return target;
  }
  // 是否已经是响应式对象
  if (isReactive(target)) {
    return target;
  }

  // 代理同一个
  if (proxysMap.has(target)) {
    return proxysMap.get(target);
  }

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      if (key === '__isReactive') {
        return true;
      }

      let res = Reflect.get(target, key, receiver);
      track(target, key);
      return isObject(res) ? reactive(res) : res;
    },
    set(target, key, value, receiver) {
      let oldLength = target.length;
      const oldVal = target[key];
      let res = Reflect.set(target, key, value, receiver);

      if (hasChanged(oldVal, value)) {
        trigger(target, key);
        if (isArray(target) && hasChanged(oldLength, target.length)) {
          trigger(target, 'length');
        }
      }
      return res;
    },
  });

  proxysMap.set(target, proxy);

  return proxy;
}

// 是否响应对象
export function isReactive(target) {
  return !!(target && target.__isReactive);
}
