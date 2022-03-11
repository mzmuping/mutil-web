class ArrayList {
  constructor() {
    this.array = [];
  }

  // 插入
  insert(item) {
    this.array.push(item);
  }

  toString() {
    return this.array.join('-');
  }

  // 交互位置
  swap(m, n) {
    const temp = this.array[m];
    this.array[m] = this.array[n];
    this.array[n] = temp;
  }

  /**
   * 冒泡排序
   * 效率比较低
   */
  bubblesort() {
    const len = this.array.length;
    const arr = this.array;
    // 第一种
    for (let i = 0; i < len; i++) {
      for (let n = 0; n < len - i; n++) {
        if (arr[n] > arr[n + 1]) {
          this.swap(n, n + 1);
        }
      }
    }
    // 第二种
    // for (let i = len - 1; i >= 0; i--) {
    //     for (let n = 0; n < i; n++) {
    //         if (arr[n] > arr[n + 1]) {
    //             this.swap(n, n + 1)
    //         }
    //         console.log(this.toString())
    //     }
    // }
  }
}

const list = new ArrayList();

list.insert(6);
list.insert(5);
list.insert(3);
list.insert(1);
list.insert(2);
list.insert(22);
list.insert(223);
list.insert(23);
list.insert(12);
list.insert(32);
list.insert(7);
list.insert(8);
list.insert(4);
list.bubblesort();
console.log('冒泡排序=', list.array);

export default ArrayList;
