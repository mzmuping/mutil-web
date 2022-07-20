/*
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
*/
// 动态规划
// let lengthOfLIS = function (nums) {
//   if (nums.length === 0) {
//     return 0;
//   }
//   let max = 0;
//   let pd = new Array(nums.length).fill(1);
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < i; j++) {
//       if (nums[j] < nums[i]) {
//         pd[i] = Math.max(pd[j] + 1, pd[i]);
//         max = Math.max(max, pd[i]);
//       }
//     }
//   }

//   return max;
// };

// 二分法
// let lengthOfLIS = function (nums) {
//   let ans = [];
//   for (let i = 0; i < nums.length; i++) {
//     let left = 0;
//     let right = ans.length;
//     while (left < right) {
//       // 二分法
//       let mid = Math.floor((left + right) / 2);
//       if (ans[mid] < nums[i]) {
//         left = mid + 1;
//       } else {
//         right = mid;
//       }
//     }
//     if (right >= ans.length) {
//       ans.push(nums[i]);
//     }
//     // 如果找不到 在ans最后增加一项nums[i]
//     else {
//       ans[right] = nums[i];
//     }
//   }
//   return ans.length;
// };

// 0 1 2 3

let lengthOfLIS = function (nums) {
  if (nums.length === 0) return 0;
  let max = 0;
  let arr = [];
  for (let i = 0; i < nums.length; i++) {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      let mid = ((left + right) / 2) | 0;
      if (nums[i] > arr[mid]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (right >= arr.length) {
      arr.push(nums[i]);
    } else {
      arr[right] = nums[i];
    }
  }
  return arr.length;
};

// console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
