class MySet {
  constructor() {
    this.set = [];
    this.size = 0;
  }

  // 迭代器
  [Symbol.iterator]() {
    let index = 0;
    let size = this.size;
    return {
      next() {
        if (index < size) {
          let data = { done: false, value: this.set[index] };
          index++;
          return data;
        } else {
          return { done: false, value: undefined };
        }
      },
    };
  }

  add(data) {
    if (!this.has(data)) {
      this.set.push(data);
      this.size++;
    }
  }

  clear() {
    this.set.length = 0;
    this.size = 0;
  }

  has(data) {
    return this.set.includes(data);
  }

  delete(value) {
    let index = this.set.indexOf(value);
    this.set.splice(index, 1);
    this.size--;
  }

  *entries() {
    let index = 0;
    let size = this.size;
    while (index < size) {
      let value = this.set[index];
      yield [value, value];
      index++;
    }
  }

  *values() {
    for (let value of this.set) {
      yield value;
    }
  }
}

let set1 = new MySet();
set1.add(1);
set1.add('adfad');
set1.add('adfad');
set1.add('adfad');
set1.add('dd');
set1.add('fgg');
set1.add('fgg');
set1.add('fgg');
set1.add('fgg');
set1.delete('fgg');
set1.clear();
let setIterator = set1.entries();

// console.log(setIterator.next());
console.log(Array.from(setIterator));
console.log(set1.size);
