import './iterator';
import './mini-set';
// es5 版
const MySet = (function () {
  const wm = new WeakMap();
  const InitPrivate = Symbol('private');
  function mySet(args) {
    this.set = [];
    // this.size=this.get();

    this[InitPrivate](args);

    Object.defineProperties(this.set, {
      [Symbol.iterator]: {
        value: function () {
          return this;
        },
      },
      next: {
        value: function () {
          if (wm.get(this)[this.index] < this.set.length) {
            return {
              value: this.set[wm.get(this)[this.index]++].value,
              done: false,
            };
          } else {
            wm.get(this)[this.index] = 0;
            return { value: undefined, done: true };
          }
        }.bind(this),
      },
    });

    Object.defineProperty(this, 'size', {
      value: 0,
      enumerable: false,
      writable: true,
      configurable: false,
    });

    wm.get(this)[this.verIf]();
  }

  // 初始化私有属性和方法
  mySet.prototype[InitPrivate] = function (args) {
    Object.defineProperties(this, {
      verIf: {
        value: Symbol('private'),
      },
      index: {
        value: Symbol('private'),
      },
    });
    const privateMembers = wm.get(this) || {};
    privateMembers[this.index] = 0;
    privateMembers[this.verIf] = Init.bind(this, args);
    wm.set(this, privateMembers);
  };

  // 对初始赋值进行检测
  function Init(args) {
    args = args || [];
    if (!(args instanceof Array)) {
      throw new Error('参数必须是数组');
    }

    for (const value of args) {
      if (!this.has(value)) {
        this.set.push({ value: value });
      }
    }
    this.size = this.get();
  }

  Object.defineProperties(mySet.prototype, {
    delete: {
      value: function (data) {
        // eslint-disable-next-line array-callback-return
        return this.set.some((item, i) => {
          if (item.value === data) {
            this.set.splice(i, 1);
            this.size = this.get();
            return true;
          }
        });
      },
    },

    add: {
      value: function (data) {
        if (!this.has(data) && data) {
          this.set.push({ value: data });
        }
        this.size = this.get();

        // 返回this，以便链式调用
        return this;
      },
    },

    has: {
      value: function (data) {
        return this.set.some((item) => item.value === data);
      },
    },

    clear: {
      value: function () {
        this.set.splice(0, this.set.length);
        this.size = this.get();
      },
    },

    get: {
      value: function () {
        return this.set.length;
      },
    },

    entries: {
      value: function () {
        let Entries = [];
        for (const value of this) {
          Entries.push({ key: value, value: value });
        }
        return Entries;
      },
    },

    values: {
      value() {
        let SetIterator = [];
        this.set.forEach((element) => {
          SetIterator.push(element);
        });

        return SetIterator;
      },
    },

    [Symbol.iterator]: {
      value: function () {
        return this.set;
      },
    },
  });

  return mySet;
})();

let set1 = new Set(['foo', 'bar', undefined]);
let set2 = new MySet(['foo', 'bar', undefined]);
// let setIter = set1.forEach((item, key, set) => {
//   console.log(item, key, set);
// });
// let entries = set2.entries();
set1.add({ a: 1 });
set1.add({ a: 1 });
set1.add({ a: 1 });

console.log(Array.from(set1.entries()));
console.log(set2);

// for (let item of set1) {
//   console.log(item);
// }

for (let item of set2) {
  console.log(item);
}

let a = [
  {
    class_id: 'c',
  },
  {
    class_id: 'a',
  },
  {
    class_id: 'b',
  },
].sort((a, b) => {
  console.log(a.class_id - b.class_id);
  return a.class_id > b.class_id ? 1 : -1;
});

console.log(aaf);
