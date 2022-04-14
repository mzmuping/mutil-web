import { isObject, hasChanged } from '../utils';
import { track, trigger } from './effect';

const proxysMap = new WeakMap();
export function reactive(target) {
  if (!isObject(target)) {
    return target;
  }

  if (isReactive(target)) {
    return target;
  }

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

      return res;
    },
    set(target, key, value, receiver) {
      const oldVal = target[key];
      let res = Reflect.set(target, key, value, receiver);

      if (hasChanged(oldVal, value)) {
        trigger(target, key);
      }
      return res;
    }
  });

  proxysMap.set(target, proxy);

  return proxy;
}

export function isReactive(target) {
  return !!(target && target.__isReactive);
}
