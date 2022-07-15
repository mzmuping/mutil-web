/**
 * 以数组 intervals 表示若干个区间的集合，
 * 其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回一个不重叠的区间数组，
 * 该数组需恰好覆盖输入中的所有区间
 */

/*
示例 1:
输入：intervals = [[1,3],[8,10],[2,6],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

示例 2:
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
*/

const merge = (intervals) => {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]); // 升序
  let outputs = [];
  outputs.push(intervals[0]);
  for (let i = 1; i < intervals.length; i++) {
    let outlast = outputs[outputs.length - 1];
    let currLeft = intervals[i][0];
    let currRight = intervals[i][1];

    if (outlast[1] < currLeft) {
      outputs.push(intervals[i]);
    } else {
      outlast[1] = Math.max(outlast[1], currRight);
    }
  }
  return outputs;
};

console.log(
  merge([
    [1, 3],
    [8, 10],
    [2, 6],
    [15, 18],
  ])
);
console.log(
  merge([
    [1, 4],
    [4, 5],
  ])
);
console.log(
  merge([
    [1, 4],
    [0, 4],
  ])
);
