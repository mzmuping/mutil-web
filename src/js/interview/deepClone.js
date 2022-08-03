// 浅拷贝
// 1. Object.assign(target,source)
// 2. es6对象扩展运算符。

// 深拷贝
let map = new WeakMap();
const deepClone = (target) => {
  if (!target) return target;

  if (typeof target !== 'object') {
    return target;
  }
  let objOrArr = Array.isArray(target) ? [] : {};
  // 处理环形
  if (map.has(target)) {
    return map.get(target);
  }
  for (let key in target) {
    // eslint-disable-next-line no-prototype-builtins
    if (target.hasOwnProperty(key)) {
      objOrArr[key] = deepClone(target[key]);
    }
  }
  return objOrArr;
};

let arr = [1, 2, 3, [4, 5, 6]];

let obj = {
  a: 1,
  b: {
    a: 1,
  },
  c: {},
};

let copyArr = deepClone(arr);
let objArr = deepClone(obj);

copyArr[3] = 7;
objArr.b = 111;
console.log(arr, copyArr);
console.log(obj, objArr);

// 去重
console.log([...new Set(arr)]);

// 数组扁平化

function flatten(arr) {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

console.log(flatten([1, 2, 3, [4, 5, 6, [7, 8, [1, 2, 3], 9], [1, 2, 3]]]));

let test = () => {};
// eslint-disable-next-line no-proto
console.log(test.toString());
