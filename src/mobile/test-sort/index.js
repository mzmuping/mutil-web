class TestSort {
  constructor() {
    this.array = [];
    this.index = 0;
  }

  insert(element) {
    this.array.push(element);
  }

  toString() {
    return this.array.join('-');
  }

  /**
   * 交换位置
   */
  swap(left, right) {
    let temp = this.array[left];
    this.array[left] = this.array[right];
    this.array[right] = temp;
  }

  /**
   * 冒泡排序
   */
  bubblingSort() {
    let len = this.array.length;
    // 第一种
    // for (let j = 0; j < len; j++) {
    //   for (let i = 0; i < len - j; i++) {
    //     if (this.array[i] > this.array[i + 1]) {
    //       this.swap(i, i + 1);
    //     }
    //   }
    // }

    // 第二种
    // 循环多少次
    for (let j = len - 1; j > 0; j--) {
      // 两两比较，交换位置
      for (let i = 0; i < j; i++) {
        this.index++;
        if (this.array[i] > this.array[i + 1]) {
          this.swap(i, i + 1);
        }
      }
    }
  }

  /**
   * 选择排序
   * 两两比较，交换最小的，
   * 相比冒泡排序，减少交换次数
   */
  selectSort() {
    let len = this.array.length;
    for (let i = 0; i < len - 1; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
        this.index++;
        if (this.array[j] < this.array[min]) {
          min = j;
        }
      }
      this.swap(min, i);
    }
  }

  /**
   * 插入排序
   * 局部有序,默认第一是有序的，所以从第二开始遍历
   */
  insertSort() {
    let len = this.array.length;

    for (let i = 1; i < len; i++) {
      let temp = this.array[i];
      let j = i;
      // 比较有序部分，
      while (this.array[j - 1] > temp && j > 0) {
        this.array[j] = this.array[j - 1];
        j--;
        this.index++;
      }
      this.array[j] = temp;
    }
  }

  /**
   * 希尔算法
   */
  shellSort() {
    let len = this.array.length;
    let gap = Math.floor(len / 2);
    // 循环间隔
    while (gap >= 1) {
      for (let i = gap; i < len; i++) {
        let j = i;
        let temp = this.array[j];
        while (this.array[j - gap] > temp && j > gap - 1) {
          this.array[j] = this.array[j - gap];
          j -= gap;
        }
        this.array[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
  }

  /**
   * 选择枢纽
   */
  median(left, right) {
    //
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

    // 把中间位置放在倒数第二位置
    this.swap(center, right - 1);

    return this.array[right - 1];
  }

  /**
   * 快速排序
   */
  quickSort() {
    let len = this.array.length;
    this.quick(0, len - 1);
  }

  /**
   * 快速排序实现
   */
  quick(left, right) {
    if (left >= right) return false;

    let pivot = this.median(left, right);
    let i = left;
    let j = right - 1;
    while (i != j) {
      console.log('前=', i, j, right);

      while (this.array[i++] < pivot) {}
      while (this.array[j--] > pivot) {}
      console.log(i, j, right);

      if (i < j) {
        this.swap(i, j);
      } else {
        break;
      }
    }
    this.swap(i, right - 1);

    this.quick(left, i - 1);
    this.quick(i + 1, right);
  }
}

const list = new TestSort();

list.insert(23);
list.insert(1);
list.insert(4);
list.insert(7);
list.insert(3);
list.insert(5);
list.insert(2);
list.insert(0);
list.insert(15);
list.insert(11);
list.insert(12);
console.time('sort');

// list.bubblingSort(); // 冒泡
// list.selectSort(); // 选择
// list.insertSort(); // 插入
// list.shellSort(); // 希尔
list.quickSort(); // 希尔
console.log(list.array);
console.log(list.index);
console.timeEnd('sort');
