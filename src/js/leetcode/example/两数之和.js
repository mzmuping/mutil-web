/**
 
给定一个整数数组 nums 和一个整数目标值 target，
请你在该数组中找出 和为目标值 target的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。
 */

// 测试案例
/**
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

输入：nums = [3,2,4], target = 6
输出：[1,2]

输入：nums = [3,3], target = 6
输出：[0,1]
 */

// 暴力解法
// 时间复杂度: O(n^2)
// 空间复杂度: O(1)
// let twoSum = function (nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let n = i + 1; n < nums.length; n++) {
//       if (nums[i] + nums[n] === target) {
//         return [i, n];
//       }
//     }
//   }
//   return [-1, -1];
// };

// map解法
// 时间复杂度: O(n)
// 空间复杂度: O(n)
let twoSumMap = (nums, target) => {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    console.log(map.has(target - nums[i]));
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }

  return [-1, -1];
};

console.log(twoSumMap([2, 7, 11, 15], 9));
