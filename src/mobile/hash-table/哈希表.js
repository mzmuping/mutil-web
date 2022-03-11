// 封装集合类
class Set {
  constructor() {
    // 属性
    this.items = {};
  }

  add(value) {
    if (this.has(value)) return false;

    this.items[value] = value;
    return true;
  }

  has(value) {
    return Object.prototype.hasOwnProperty.call(this.items, value);
  }

  remove(value) {
    if (!this.has(value)) return false;
    delete this.items[value];
    return true;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  /**
   *
   * @returns 获取值
   */
  values() {
    return Object.values(this.items);
  }

  /**
   * 合拼集合
   * @param {otherSet}  要集合
   * @returns
   */
  union(otherSet) {
    const unionSet = new Set();

    const values = this.values();

    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    const otherValues = otherSet.values();
    for (let n = 0; n < otherValues.length; n++) {
      unionSet.add(otherValues[n]);
    }
    return unionSet;
  }

  /**
   * 交集
   * @param {*} otherSet
   */
  intersection(otherSet) {
    const intersectionSet = new Set();

    const values = this.values();

    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      if (otherSet.has(item)) {
        intersectionSet.add(item);
      }
    }

    return intersectionSet;
  }

  /**
   * 差集
   * @param {*} otherSet
   */
  difference(otherSet) {
    const difSet = new Set();
    const values = this.values();

    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      if (!otherSet.has(item)) {
        difSet.add(item);
      }
    }
    return difSet;
  }

  /**
   * 子集
   */
  subset(otherSet) {
    const values = otherSet.values();
    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      if (!this.has(item)) {
        return false;
      }
    }
    return true;
  }
}

const set = new Set();
const other = new Set();
const sub = new Set();

console.log(set.add('abc'));
console.log(set.add('abc'));
console.log(set.add('开始'));
console.log(set.add('结束'));
console.log(set.add('455'));
console.log(set.add('565'));
other.add(11);
other.add('康师傅');
other.add('咖啡');
other.add('咖啡');
other.add('结束');
other.add('开始');
sub.add('开始');
sub.add('结束');

const union = set.union(other);

console.log(union.values());
console.log('交集=', set.intersection(other).values());
console.log('差集=', set.difference(other).values());
console.log('子集=', set.subset(sub));
