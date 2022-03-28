/**
 * 自己是现实，效率太低了
 * @param {*} str
 * @returns
 */
function isValid(str) {
  if (!str || str.length % 2 != 0) return false;
  let mapx = {
    '[': ']',
    '(': ')',
    '{': '}'
  };
  let arr = str.split('');
  while (arr.length > 0) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      let item = arr[i];
      let next = arr[i + 1];
      if (mapx[item] === next) {
        arr.splice(i, 2);
        break;
      }
      if (i >= len - 2) {
        return false;
      }
    }
  }

  return true;
}

/**
 * 实现的，效率搞
 * @param {s} s 字符串
 * @returns boolean
 */
function isValid2(s) {
  let items = [];
  let len = s.length;
  if (len % 2 != 0) return false;
  for (let i = 0; i < len; i++) {
    let letter = items[items.length - 1];
    switch (s[i]) {
      case '(':
        items.push('(');
        break;
      case '[':
        items.push('[');
        break;
      case '{':
        items.push('{');
        break;
      case ')':
        if (letter === '(') {
          items.pop();
        }
        break;
      case ']':
        if (letter === '[') {
          items.pop();
        }
        break;
      case '}':
        if (letter === '{') {
          items.pop();
        }
        break;
    }
  }
  return items.length === 0;
}

let test1 = '({{{{{{{{{[[[[[[[[[(((((((((((())))))))))))]]]]]]]]]}}}}}}}}})';
let test2 = '(){}[]';
let test3 = '(]';
let test4 = '{()}';
console.log('isValid=====');
console.log(isValid(test1));
console.log(isValid(test2));
console.log(isValid(test3));
console.log(isValid(test4));

console.log('isValid2=====');

console.log(isValid2(test1));
console.log(isValid2(test2));
console.log(isValid2(test3));
console.log(isValid2(test4));
