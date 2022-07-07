/**
 * 原理：
 * 1.选择数列中一个数为基数，
 * 2.小于基数放在左边，大于基数放在又边
 * 3.重复，1，2步骤
 * 4.最后基数和左右数组合并起来
 */

function quickSort(arr) {
  let baseNum = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= baseNum) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  if (leftArr.length >= 2) leftArr = quickSort(leftArr);
  if (rightArr.length >= 2) rightArr = quickSort(rightArr);

  return leftArr.concat(baseNum, rightArr);
}
console.time();
//
let arrs = [1, 4, 5, 2934, 55, 67, 34];
let arr2 = quickSort(arrs);

console.log(arr2);
console.timeEnd();
