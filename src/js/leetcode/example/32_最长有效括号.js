/**
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度
 */

/*
示例 1:
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"

示例 2:
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"

示例 3:

输入：s = ""
输出：0
*/

/**
 * @param {string} s
 * @return {number}
 */
let longestValidParentheses = function (s) {
  let max = 0;
  let len = s.length;
  let stack = [-1];
  for (let i = 0; i < len; i++) {
    let value = s[i];
    if (value === '(') {
      stack.push(i);
    } else if (value === ')') {
      stack.pop();

      if (stack.length === 0) {
        stack.push(i);
      } else {
        max = Math.max(max, i - stack[stack.length - 1]);
      }
    }
  }
  return max;
};
console.log(longestValidParentheses('()(((((((()'));
