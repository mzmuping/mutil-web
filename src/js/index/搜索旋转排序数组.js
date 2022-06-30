/**
 * 使用二分法查询，有序才有用
 * @param {*} nums
 * @param {*} target
 * @returns
 */
function search(nums, target) {
  if (!nums || nums.length <= 0) return -1;
  let l = 0;
  let r = nums.length - 1;
  let mid;
  while (l <= r) {
    mid = ~~((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      // 有序
      if (nums[l] <= target && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (target >= nums[mid] && target <= nums[r]) {
        l = mid;
      } else {
        r = mid;
      }
    }
  }

  return -1;
}

const nums = [7, 8, 1, 2, 3, 4, 5, 6];
const target = 1;
const res = search(nums, target);

console.log('结果：' + res);
console.log('结果2：' + res);
