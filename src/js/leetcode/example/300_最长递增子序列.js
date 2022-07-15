/*
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
*/

let lengthOfLIS = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  let dp = new Array(nums.length).fill(1); // dp[i]表示i之前最长上升子序列长度
  let max = dp[0];
  for (let i = 0; i < nums.length; i++) {
    // 求出所有长度的dp
    for (let j = 0; j < i; j++) {
      // dp[i] = max(dp[j] + 1,dp[i])  j<i 如果nums[j] < nums[i] 则nums[i] 可以放在dp[j]后面，长度增加1，
      if (nums[j] < nums[i]) {
        console.log(nums[j], nums[i], '===', j, i);
        dp[i] = Math.max(dp[j] + 1, dp[i]);
        max = Math.max(max, dp[i]);
      }
    }
    console.log('max=', max, 'i=', i);
  }
  return max;
};
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
