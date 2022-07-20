/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = (left + right) >> 1;
    if (nums[mid] === target) {
      return mid;
    }
    // 右边有序
    if (nums[mid] < nums[right]) {
      // (mid,right]
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    } else {
      // 左边有序
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
};

console.log(search([7, 8, 9, 0, 1, 2, 4, 5, 6], 0));
// console.log(search([1, 3], 1));
