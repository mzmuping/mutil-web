import { Dep } from './dep';

const targetsMap = new Map();

function getDep(target, key) {
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

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
    }
  });
}

// 测试

// const user = reactive({
//   age: 10
// });
// let b;
// effectWatch(() => {
//   b = user.age + 2;
//   console.log('b==', b);
// });

// user.age = 22;
