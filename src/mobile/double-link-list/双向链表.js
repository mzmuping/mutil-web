class Node {
    constructor(data) {
        this.data = data;
        this.pre = null;
        this.next = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * @description 尾部添加数据
     * @param {*} data
     */
    append(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.pre = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length += 1;
    }

    /**
     * @description 插入数据
     * @param {position} 位置
     * @param {element} 插入元素
     * @returns
     */
    insert(position, element) {
        if (position < 0 || position > this.length) return false;
        const newNode = new Node(element);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (position === 0) {
                // 加到第一个
                const current = this.head;
                newNode.next = current;
                current.pre = newNode;
                this.head = newNode;
            } else if (position === this.length) {
                // 加到最后
                const current = this.tail;
                current.next = newNode;
                newNode.pre = current;
                this.tail = newNode;
            } else {
                // 插入中间
                let current = this.head;
                let index = 0;
                while (index++ < position) {
                    current = current.next;
                }
                newNode.pre = current;
                newNode.next = current.next;
                newNode.next.pre = newNode;
                current.next = newNode;
            }
        }

        this.length += 1;
    }

    /**
     * @description 获取某个
     * @param {position} 索引值
     */
    get(position) {
        if (position < 0 || position >= this.length || this.length === 0) return null;
        let index = 0;
        let current = this.head;

        while (index++ < position) {
            current = current.next;
        }

        return current.data;
    }

    /**
     * @description 查询元素下标
     * @param {element}  元素
     */
    indexOf(element) {
        if (this.length === 0) return -1;

        let index = -1;
        let l = 0;
        let current = this.head;

        while (l++ < this.length) {
            if (current.data === element) {
                index = l - 1;
                break;
            }
            current.next && (current = current.next);
        }

        return index;
    }

    /**
     * @description 更新元素
     * @param {position}  下标
     * @param {element} 元素
     */
    update(position, element) {
        if (position < 0 || position > this.length || this.length === 0) return false;

        let index = 0;
        let current = this.head;
        while (index++ < position) {
            current = current.next;
        }
        current.data = element;
        return index - 1;
    }

    /**
     * @description 删除某个元素
     * @param {*} 下标
     */
    removeAt(position) {
        if (position < 0 || position >= this.length || this.length === 0) return false;

        let current = this.head;
        if (position === 0) {
            const current = this.head;
            this.head = current.next;
            current.next.pre = null;
        } else if (position === this.length - 1) {
            current = this.tail;
            this.tail = current.pre;
            current.pre.next = null;
        } else {
            let index = 0;
            while (index++ < position) {
                current = current.next;
            }
            current.pre.next = current.next;
            current.next.pre = current.pre;
        }
        this.length -= 1;
    }

    /**
     * @description 删除某个元素
     * @param {*} 内容
     */
    remove(element) {
        if (this.length === 0) return false;

        let index = 0;
        let current = this.head;

        while (index++ < this.length) {
            if (current.data === element) {
                index = index - 1;
                if (index === 0) {
                    this.head = current.next;
                    current.next.pre = null;
                } else if (index === this.length - 1) {
                    current = this.tail;
                    this.tail = current.pre;
                    current.pre.next = null;
                } else {
                    current.pre.next = current.next;
                    current.next.pre = current.pre;
                }
                break;
            }
            current.next && (current = current.next);
        }
    }

    // 转字符串
    toString() {
        return this.backwordString();
    }

    /**
     *
     * @returns 向前转tostring
     */
    forwardString() {
        if (this.head === null) return '';
        let str = '';
        let current = this.tail;
        while (current) {
            str += ' ' + current.data;
            current = current.pre;
        }
        return str;
    }

    /**
     *
     * @returns 向后转tostring
     */
    backwordString() {
        if (this.head === null) return '';
        let str = '';
        let current = this.head;
        while (current) {
            str += ' ' + current.data;
            current = current.next;
        }
        return str;
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }
}

const doubly = new DoublyLinkedList();

doubly.append(1);
doubly.append(2);
doubly.append(3);
doubly.insert(0, 4);
doubly.insert(2, 5);
doubly.insert(5, 6);
doubly.insert(6, 7);
doubly.insert(8, 8);
doubly.insert(2, 9);

console.log('双向链表=', doubly);
console.log('双向链表toString=', doubly.toString());

doubly.update(2, 10);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.removeAt(0);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.removeAt(6);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.removeAt(7);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.removeAt(2);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.remove(1);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.remove(3);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.remove(3);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

doubly.remove(1);
console.log('双向链表toString=', doubly.toString());
console.log('双向链表forwardString=', doubly.forwardString());

console.log('双向链表 get(0) =', doubly.get(8));
console.log('双向链表 indexOf(2) =', doubly.indexOf(6));
