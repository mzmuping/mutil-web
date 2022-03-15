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
  swap(left, rigth) {
    let temp = this.array[left];
    this.array[left] = this.array[rigth];
    this.array[rigth] = temp;
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
   * 希尔排序
   */
  shellSort() {}
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

// list.bubblingSort(); // 冒泡
// list.selectSort(); // 选择
list.insertSort(); // 选择
console.log(list.array);
console.log(list.index);
