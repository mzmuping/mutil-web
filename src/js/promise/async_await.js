/**
 * async 和 await模拟实现
 */

/**
 * 实现 generator
 */
function* myGeneratorDemo() {
  yield 'adf';
  yield 'hello';
  console.log('sfsde');
}

const mygeneratorDemo = myGeneratorDemo();

// console.log(mygeneratorDemo.next()); // {value: 'adf', done: false}
// console.log(mygeneratorDemo.next()); // {value: 'adf', done: false}
// console.log(mygeneratorDemo.next()); // {value: undefined, done: true}

// 要想实现async 和 await 的功能我必须先解决Generator自动执行问题
function* myGenerator() {
  const res1 = yield Promise.resolve('1');
  console.log('res1', res1); // 1
  const res2 = yield Promise.resolve('2');
  console.log('res2', res2); // 2
}

// 手动执行迭代器
// const gen = myGenerator();

// console.log(
//   gen.next().value.then((res) => {
//     let { done, value } = gen.next(res);
//     console.log(done);
//     if (!done) {
//       value.then((val) => {});
//       gen.next();
//     }
//   })
// );

// 自动执行函数

// function runGenerator(gen) {

//   let g = gen();

//   function _next(val) {
//     let { value, done } = g.next(val);
//     if (done) return value;
//     value.then((val) => {
//       _next(val);
//     });
//   }

//   _next();
// }

// const rg = runGenerator(myGenerator);

// 4、返回promise和异常处理

function runGenerator(gen) {
  return new Promise((resolve, reject) => {
    let g = gen();
    let res;
    function _next(val) {
      try {
        res = g.next(val);
      } catch (err) {
        reject(err);
      }

      if (res.done) return resolve(res.value);
      Promise.resolve(res.value).then(
        (val) => _next(val),
        (err) => g.throw(err)
      );
    }

    _next();
  });
}
const rg = runGenerator(myGenerator);

// 测试 promise

function a() {
  console.log('a()===');
  setTimeout(() => {
    console.log('a()===setTimeout');
  }, 1000);
}

function b() {
  return new Promise((resolve, reject) => {
    console.log('rpro');
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

async function as() {
  let resa = await a();
  console.log('resa====', resa);

  let resb = await b();
  console.log('resb====', resb);
}

// as();

function c() {
  return new Promise((resolve, reject) => {
    resolve(1);
  });
}

c()
  .then((res) => {
    console.log(res);
    return res + 1;
  })
  .then((res) => {
    return res + 1;
  })
  .then((res) => {
    return res + 1;
  })
  .then((res) => {
    console.log('res===', res);
  });
