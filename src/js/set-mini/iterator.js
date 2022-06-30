/**
 * 迭代器
 */
// 对象转换迭代器
let myIterator = {
  a: 1,
  b: 2,
};

myIterator[Symbol.iterator] = function* () {
  for (let key of Object.keys(this)) {
    yield [key, this[key]];
  }
};

for (let item of myIterator) {
  console.log('item==', item);
}

console.log([...myIterator]);
// 数组 迭代器

let arr1 = [1, 2, 3, 4];
let arrIterator = arr1[Symbol.iterator]();

console.log('数组 迭代器=', arrIterator.next());

// 自定义 迭代器

class Counter {
  constructor(limit) {
    this.limit = limit;
  }

  [Symbol.iterator]() {
    let counter = 1;
    let limit = this.limit;
    return {
      next() {
        if (counter <= limit) {
          return { done: false, value: counter++ };
        }
        return { done: true, value: undefined };
      },
      return() {
        console.log('Exiting early');
        return { done: true };
      },
    };
  }
}

let count = new Counter(3);
// count.next();
let coun = count[Symbol.iterator]();
console.log(coun.next());
console.log(coun.next());
console.log(coun.next());
console.log(coun.next());
for (let i of count) {
  console.log('i==', i);
}
