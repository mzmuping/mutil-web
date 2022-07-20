/*
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

来源：力扣（LeetCode）
*/
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
// let reverseBetween = function (head2, left, right) {
//   console.log(head2);
//   let head = head2.filter(Boolean);
//   let tmp;
//   left -= 1;
//   right -= 1;
//   while (left < right) {
//     tmp = head[left];
//     head[left] = head[right];
//     head[right] = tmp;
//     left++;
//     right--;
//   }

//   return head;
// };

// console.log(reverseBetween([1, 2, 3, 4, 5, 6, 7, 8], 2, 7));

function ListNode(val) {
  this.val = val;
  this.next = null;
  this.pre = null;
}
// 链表
function Lists() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
// 单链
Lists.prototype.append = function (val) {
  let node = new ListNode(val);
  if (this.head == null) {
    this.head = node;
  } else {
    let next = this.head;
    while (next.next) {
      next = next.next;
    }
    next.next = node;
  }
};
// 双链
Lists.prototype.addDouble = function (val) {
  let node = new ListNode(val);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.pre = this.tail;
    this.tail = node;
  }

  this.length++;
};
// 反转单链表
let reverseBetween = (head) => {
  let pre = null;
  let temp = null;
  let current = head;

  while (current !== null) {
    temp = current.next;
    current.next = pre;
    pre = current;
    current = temp;
  }
  return pre;
};

// 单链表
let singleLists = new Lists();
let doubleLists = new Lists();
for (let i = 0; i < 6; i++) {
  singleLists.append(i);
  doubleLists.addDouble(i);
}
console.log(singleLists);
console.log(doubleLists);
// console.log(reverseBetween(singleLists.head));
