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

function ListNode(val, next) {
  this.val = val;
  this.next = null;
}

let reverseBetween = (head, left, right) => {};

let lists = new SympleList();

function SympleList() {
  this.head = null;
  this.length = 0;
  this.append = (val) => {
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
}

for (let i = 0; i < 6; i++) {
  lists.append(i);
}
console.log(lists);
