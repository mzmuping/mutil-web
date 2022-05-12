let activeEffect;
let activeEffectStack = [];
export function effect(fn, option = {}) {
  const efffectFn = () => {
    try {
      activeEffect = efffectFn;
      activeEffectStack.push(efffectFn);
      return fn();
    } finally {
      activeEffectStack.pop();
      activeEffect = activeEffectStack[activeEffectStack.length - 1];
    }
  };
  if (!option.lazy) {
    efffectFn();
  }
  efffectFn.scheduler = option.scheduler;
  return efffectFn;
}

// 储存响应式对象
const targetsMap = new WeakMap();

// 收集依赖
export const track = (target, key) => {
  if (!activeEffect) {
    return;
  }

  let deps = getDeps(target, key);
  deps.add(activeEffect);
};

export const trigger = (target, key) => {
  let deps = getDeps(target, key);
  deps.forEach((effectFn) => {
    if (effectFn.scheduler) {
      effectFn.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
};

function getDeps(target, key) {
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  return deps;
}
