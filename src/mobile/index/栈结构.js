// 封装栈类
function Stack() {
  this.items = [];
  // 压入元素
  Stack.prototype.push = function (ele) {
    this.items.push(ele);
  };
  // sahnchu
  Stack.prototype.pop = function () {
    this.items.pop();
  };
  // 查看最后一个
  Stack.prototype.peek = function () {
    return this.items[this.length - 1];
  };
  // 是否空
  Stack.prototype.isEmpty = function () {
    return this.items.length == 0;
  };
  // 大小
  Stack.prototype.size = function () {
    return this.items.length;
  };
  //
  Stack.prototype.toString = function () {
    let resString = '';
    this.items.forEach((ele) => {
      resString += ' ' + ele;
    });
    return resString;
  };
}

const s = new Stack();
s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);

console.log(s);

s.pop();
s.pop();
s.pop();
