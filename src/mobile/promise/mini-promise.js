function MyPromise(fn) {
  let state = 'pending';
  const deferreds = [];
  let value = null;
  this.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolve) => {
      handle({
        onFulfilled,
        resolve,
        onRejected,
      });
    });
  };

  this.catch = function (err) {
    console.log(err);
  };

  function handle(deferred) {
    switch (state) {
      case 'pending':
        deferreds.push(deferred);
        return;
      case 'fulfilled':
        deferred.resolve(deferred.onFulfilled(value));
        return;
      case 'rejected':
        this.catch('报错了');
    }
  }
  function resolve(_value) {
    state = 'fulfilled';
    value = _value;
    setTimeout(() => {
      deferreds.forEach((deferred) => {
        handle(deferred);
      });
    }, 0);
  }

  function reject(_value) {
    state = 'onRejected';
    value = _value;
    setTimeout(() => {
      deferreds.forEach((deferred) => {
        handle(deferred);
      });
    }, 0);
  }

  fn(resolve, reject);
}

const myp = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('你哈');
  }, 1000);
});
myp
  .then((val) => {
    console.log('val==' + val);
    return val + '111';
  })
  .then((val) => {
    console.log('val==' + val);
    return val + 'sfsdf';
  })
  .then((val) => {
    console.log('val==' + val);
  });
