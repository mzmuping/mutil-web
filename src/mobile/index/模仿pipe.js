function pipe() {
  const fns = Array.prototype.slice.call(arguments);
  const content = this;
  return function () {
    const args1 = Array.prototype.slice.call(arguments);
    let count = 0;
    function next() {
      const args = Array.prototype.slice.call(arguments);
      const fn = fns.shift();
      count = fn.apply(content, args);
      if (fns.length > 0) {
        next(count);
      }
      return count;
    }

    return next.apply(null, args1);
  };
}

function addOne(num) {
  return num + 1;
}

function addTwo(num) {
  return num + 2;
}

function addThree(num) {
  return num + 3;
}

function addFour(num) {
  return num + 4;
}

const fn = pipe(addOne, addTwo, addThree, addFour);

console.log(fn);
