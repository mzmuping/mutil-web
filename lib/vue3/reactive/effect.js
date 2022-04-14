let activeEffect;
export function effect(fn) {
  const efffectFn = () => {
    try {
      activeEffect = efffectFn;

      return fn();
    } finally {
    }
  };
  efffectFn();
  return efffectFn;
}

// 储存响应式对象
const targetsMap = new WeakMap();

// 收集依赖
export const track = (target, key) => {
  let deps = getDeps(target, key);
  deps.add(activeEffect);
};

export const trigger = (target, key) => {
  let deps = getDeps(target, key);
  deps.forEach((effectFn) => {
    effectFn();
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
