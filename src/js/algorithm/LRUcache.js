// 这个map的实现方法
// 优点：代码少
// 缺点：有相同存在，还得删除在添加
class LRUcache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    let res = this.cache.get(key);
    this.cache.delete(key);
    this.set(key, res);
    return res;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}

// 测试
// let lru = new LRUcache(3);
// lru.put('1', 1);
// lru.put('2', 1);
// lru.put('3', 1);
// console.log(lru.cache.keys());
// lru.put('4', 1);
// console.log(lru.get('3'));
// console.log(lru.cache.keys());

// 双链表
class LRUlink {
  constructor(size) {
    this.size = size;
    this.lists = {};
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.pre = this.head;
    this.count = 0;
  }

  get(key) {
    let targetNode = this.lists[key];
    if (!targetNode) return -1;

    this.removeNode(targetNode);
    this.addToHead(targetNode);

    return targetNode.data;
  }

  put(key, value) {
    let node = this.lists[key];
    if (node) {
      // 存在了
      this.removeNode(node);
      this.addToHead(node);
      node.data = value;
    } else {
      let newNode = new Node(key, value);
      this.addToHead(newNode);
      this.lists[key] = newNode;
      this.count++;
      if (this.count > this.size) {
        let tailNode = this.tail.pre;
        let tailNodekey = tailNode.key;
        this.removeNode(tailNode);
        delete this.lists[tailNodekey];
        this.count--;
      }
    }
  }

  removeNode(node) {
    let next = node.pre; // 前面的
    let pre = node.next; // 后面
    next.next = pre;
    pre.pre = next;
  }

  addToHead(node) {
    let firstNode = this.head.next;
    this.head.next = node;
    node.pre = this.head;
    node.next = firstNode;
  }
}

class Node {
  constructor(key, data) {
    this.next = null;
    this.pre = null;
    this.data = data;
    this.key = key;
  }
}

// 测试
let lruLink = new LRUlink(3);

lruLink.put(5, {});
lruLink.put(5, { name: 12 });

console.log(lruLink);
