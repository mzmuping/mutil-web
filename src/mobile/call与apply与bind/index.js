/* eslint-disable no-eval */
/* eslint-disable no-extend-native */
/**
 * call 介绍：
 * call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法
 */
/**
 * 假如：
 */
/**
 *支持es3版
 */
Function.prototype.call2 = function (context) {
  context = context || window;
  context.fn = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  console.log('args', args);
  console.log('context.fn(' + args + ')');
  // eslint-disable-next-line no-eval
  let result = eval('context.fn(' + args + ')');

  delete context.fn;
  return result;
};
/**
 * 支持es6版
 * @param {*} context
 */
Function.prototype.call3 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('不是一个函数');
  }

  context = context || window;

  context.fn = this;

  let [_, ...args] = arguments;
  console.log(_, args);
  context.fn(...args);
  delete context.fn;
};
// 测试一下
let foo = {
  value: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

// bar.call2(foo, 'kevin', 18);
bar.call3(foo, 'kevin', 18);

/**
 * apply 的实现跟 call 类似
 */
Function.prototype.myApply = function (context, arr) {
  context = context || window;
  context.fn = this;
  let result;
  if (!arr) {
    context.fn();
  } else {
    let args = [];
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  }

  delete context.fn;
  return result;
};

Function.prototype.apply = function (context, arr) {
  context = context || window;
  context.fn = this;
  arr = arr || [];
  const res = context.fn(...arr);
  delete context.fn;
  return res;
};

// 测试
// bar.call2(foo, 'kevin', 18);
bar.myApply(foo, ['kevin', 18]);

Function.prototype.myBind = function (context) {
  return function (...args) {
    this.apply(context, args);
  };
};

let targetMap = new Map();

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      console.log(target, key);
      return Reflect.get(target, key);
    },
  });
}

// 测试一下
let ret = reactive({
  a: 1,
  b: {
    c: 1,
  },
});

console.log(ret.a);
