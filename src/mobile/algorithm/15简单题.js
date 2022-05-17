/**
 * 去重
 */
function duplicate(arr) {
  let arrDup = new Set(arr);
  let newArr = Array.from(arrDup);

  return newArr;
}

console.log('去重', duplicate([1, 2, 3, 4, 5, 5, 5, 5, 5]));

/**
 * 求斐波那契数列 0,1,1,2,3,5,8,13,21,34...第n项
 * 公式: n=0>0,n=1>1,f(n)= f(n-1)+ f(n-2) (n>=2)
 */
// 递归
const fib = (num) => {
  if (num < 2) {
    return num;
  }

  return fib(num - 1) + fib(num - 2);
};

// console.log('6,递归n项', fib(2));

// 动态规划
const fibSuper = (num) => {
  if (num < 2) {
    return num;
  }
  const numArr = [0, 1];
  for (let i = 2; i < num; i++) {
    numArr.push(numArr[0] + numArr[1]);
    numArr.splice(0, 1);
  }

  return numArr[1];
};

// console.log('6,动态规划n项', fibSuper(100));

/**
 * 7.找出下列正数组的最大差值
 * [10,5,11,7,8,9]
 * 输出 6
 */
const getMaxProfit = (arr) => {
  if (arr.length <= 1) {
    return arr[0];
  }

  arr = arr.sort((a, b) => {
    return a - b;
  });

  //   const min = Math.min(...arr);
  //   const max = Math.max(...arr);
  //   return max-min
  return arr[arr.length - 1] - arr[0];
};

// console.log('[10,5,11,7,8,9],最大差值', getMaxProfit([10, 5, 11, 7, 8, 9]));

/**
 * 冒泡排序
 */

const bubbleSort = (arr) => {
  let len = arr.length - 1;
  for (let i = 0; i <= len; i++) {
    for (let j = 0; j <= len - i; j++) {
      if (arr[j + 1] < arr[j]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
};
console.log('[10,5,11,7,8,9],冒泡排序', bubbleSort([10, 5, 11, 7, 8, 9]));

/**
 * 9. 求数组的交集
 * const arrOne = [1,2,3,5,6,6]
 * const arrTwo = [1,3,5]
 */

const interSectionFn = (arrOne, arrTwo) => {
  let res = arrOne.filter((item1) => arrTwo.some((item2) => item1 === item2));
  //   let res = arrOne.filter((item1) => arrTwo.includes(item1));
  return res;
};
console.log(
  '[1,2,3][1,3,5],求数组的交集',
  interSectionFn([1, 2, 3, 5, 6, 6], [1, 3, 5, 6, 7, 7])
);
