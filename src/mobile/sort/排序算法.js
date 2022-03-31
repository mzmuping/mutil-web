class ArrayList {
  constructor() {
    this.array = [];
    this.index = 0;
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
   * 空间复杂度O(n^2)
   * 时间复杂度O(n^2)
   */
  bubblesort() {
    console.time('Sort');
    const len = this.array.length;
    const arr = this.array;
    // 第一种
    // for (let i = 0; i < len; i++) {
    //   for (let n = 0; n < len - i; n++) {
    //         this.index++;
    //     if (arr[n] > arr[n + 1]) {
    //       this.swap(n, n + 1);
    //     }
    //   }
    // }

    // 第二种
    for (let i = len - 1; i >= 0; i--) {
      for (let n = 0; n < i; n++) {
        if (arr[n] > arr[n + 1]) {
          this.swap(n, n + 1);
        }
        this.index++;
      }
    }
    console.timeEnd('Sort');
  }

  /**
   * 选择排序
   * 空间复杂度O(n)
   * 时间复杂度O(n^2)
   */
  selectionSort() {
    console.time('Sort');

    const len = this.array.length;

    for (let j = 0; j < len - 1; j++) {
      let min = j;
      for (let i = min + 1; i < len; i++) {
        if (this.array[min] > this.array[i]) {
          min = i;
        }
        this.index++;
      }
      this.swap(min, j);
    }
    console.timeEnd('Sort');
  }

  /**
   * 插入排序
   */
  insertSort() {
    console.time('Sort');

    const len = this.array.length;

    for (let i = 1; i < len; i++) {
      const temp = this.array[i];
      let j = i;
      while (this.array[j - 1] > temp && j > 0) {
        this.array[j] = this.array[j - 1];
        j--;
        this.index++;
      }
      this.array[j] = temp;
    }
    console.timeEnd('Sort');
  }

  /**
   * 希尔排序
   * 原理：分隔，插入排序
   */
  shellSort() {
    console.time('Sort');
    // 1.获取数组长度
    const len = this.array.length;
    // 2.初始化增量
    let gap = Math.floor(len / 2);

    // 3.while 循环（gap不断减少）
    while (gap >= 1) {
      // 4.以gap作为间隔，进行分组，对分组进行插入排序
      for (let i = gap; i < len; i++) {
        const temp = this.array[i];
        let j = i;
        console.log('j=', j);
        while (this.array[j - gap] > temp && j > gap - 1) {
          this.array[j] = this.array[j - gap];
          j -= gap;

          console.log('j2=', j);
        }
        // 5.将j位的元素赋值temp
        this.array[j] = temp;
      }
      // gap每次重新分配，减少一半，最后等于1，执行最后一次
      gap = Math.floor(gap / 2);
    }
    console.timeEnd('Sort');
  }

  /**
   * 快速排序
   * 选择枢纽
   */
  median(left, right) {
    // 1. 取出中间的位置
    let center = Math.floor((left + right) / 2);
    // 2. 判断大小，交换位置
    if (this.array[left] > this.array[center]) {
      this.swap(left, center);
    }
    if (this.array[center] > this.array[right]) {
      this.swap(center, right);
    }
    if (this.array[left] > this.array[center]) {
      this.swap(left, center);
    }

    this.swap(center, right - 1);

    return this.array[right - 1];
  }

  /**
   * 快速排序
   */
  quickSort() {
    console.time('Sort');
    this.quick(0, this.array.length - 1);
    console.log('this.index=', this.index);
    console.timeEnd('Sort');
  }

  /**
   * 快速排序实现
   */
  quick(left, right) {
    // 1. 结束递归
    if (left >= right) return false;

    // 2、获取枢纽
    let pivot = this.median(left, right);

    // 3. 定义变量，用于记录当前找到的位置
    let i = left;
    let j = right - 1;

    // 4. 开始进行交换
    while (i != j) {
      while (this.array[++i] < pivot) {}
      while (this.array[--j] > pivot) {}

      if (i < j) {
        this.swap(i, j);
      } else {
        break;
      }
    }

    // 5. 将枢纽放置在正确位置，i的位置
    this.swap(i, right - 1);

    // 6. 分而治之
    this.quick(left, i - 1);
    this.quick(i + 1, right);
  }
}

const list = new ArrayList();

list.insert(42);
list.insert(27);
list.insert(46);
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
list.insert(11);

// for (let k = 0; k < 1000; k++) {
//   list.insert(Math.random() * 1000);
// }

// list.bubblesort();
// console.log('冒泡排序=', list.array);

// list.selectionSort();
// console.log('选择排序=', list.array);

// list.insertSort();
// console.log('插入排序=', list.array);

// list.shellSort();
// console.log('希尔排序=', list.array);

list.quickSort();

console.log(list.array);
console.log(list.index);

export default ArrayList;
