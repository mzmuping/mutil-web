// import './async_await';
// import './mini-promise';

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(fn) {
  let self = this;
  this.status = PENDING; // pending（进行中）、fulfilled（已成功）和 rejected（已失败）
  this.value = null;
  this.error = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilledCallbacks.forEach((callback) => callback(self.value));
      }, 0);
    }
  }

  function reject(error) {
    if (self.status === PENDING) {
      setTimeout(function () {
        self.status = REJECTED;
        self.error = error;
        self.onRejectedCallbacks.forEach((callback) => callback(self.error));
      }, 0);
    }
  }

  fn(resolve, reject);
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  let bridgePromise;
  onFulfilled =
    typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (error) => {
          throw error;
        };

  if (self.status === FULFILLED) {
    return (bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }));
  }
  if (self.status === REJECTED) {
    return (bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(self.error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }));
  }
  if (this.status === PENDING) {
    return (bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
      self.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    }));
  }
};
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
// 用来解析回调函数的返回值x,x可能是普通值也可以是promise
function resolvePromise(bridgePromise, x, resolve, reject) {
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(
        (y) => {
          resolvePromise(bridgePromise, y, resolve, reject);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else {
    resolve(x);
  }
}

// 测试
let mypro = new MyPromise((resolve, reject) => {
  console.log('同步');
  resolve('异步执行');
});
mypro
  .then(() => {
    console.log('第一个then');
    return new MyPromise((resolve, reject) => {
      reject(new Error('123'));
    });
  })
  .then(() => {
    console.log('第二个then');
  })
  .catch((err) => {
    console.log(err);
  });
