import { Dep, effectWatch } from './dep';

export function ref(val) {
    return new Dep(val);
}

// // 测试
// const count = ref(100);
// let b;
// effectWatch(() => {
//   b = count.value + 2;
//   console.log('b==', b);
// });

// count.value++;
