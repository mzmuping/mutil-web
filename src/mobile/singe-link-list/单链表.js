
class SingeLinkLisk {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    //后面插入
    append(data) {
        let newNode = new Node(data);
        let current = this.head;
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode
        } else {

            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length += 1;
    }

    //自定位置插入
    insert(position, data) {
        let newNode = new Node(data);
        if (position < 0 || position > (this.length + 1)) return false;

        if (position === 0) {
            this.head = newNode;
        } else {
            let current = this.head;
            let pre = null;
            let index = 0;
            while (index++ < position) {
                pre = current;
                current = current.next;
            }

            pre.next = newNode;
            newNode.next = current;
        }

        this.length += 1;

        return true;
    }
    //获取某一个元素
    get(position) {

        if (position < 0 || position > this.length) return null;
        let index = 0;
        let current = this.head;
        while (index++ < position) {
            current = current.next;
        }

        return current.data;

    }
    /**
     * @description 返回元素索引
     * @param {element} 元素 
     * @returns 
     */
    indexOf(element) {
        let index = -1;
        let l = 0
        let current = this.head;
        while (l++ < this.length) {
            if (current.data === element) {
                index = l;
                break;
            }
            current.next && (current = current.next);

        }

        return index;
    }

    /**
     * @description 更新某个位置元素
     * @param {position} 索引值 
     * @param {data} 更新元素
     */
    update(position, data) {
        if (position < 0 || position > this.length) return false;

        let current = this.head;
        let index = 0;
        while (index++ < position) {
            current = current.next;
        }

        current.data = data;
        return index
    }

    /**
     * @description 移除某个元素
     * @param {position}  索引值
     */
    removeAt(position) {
        if (position < 0 || position > this.length) return false;

        let current = this.head;
        let index = 0;
        let pre = null
        let next = null;
        while (index++ < position) {
            pre = current;
            current = current.next;
            if (current.next) {
                next = current.next;
            }
        }
        pre.next = next

        this.length -= 1;
    }

    /**
  * @description 移除某个元素
  * @param {ele}  索引值
  */
    remove(ele) {
        if (position < 0 || position > this.length) return false;

        let current = this.head;
        let index = 0;
        let pre = null
        let next = null;
        while (index++ < position) {
            pre = current;
            current = current.next;
            if (current.next) {
                next = current.next;
            }
        }
        pre.next = next
        this.length -= 1;
    }

    //返回序列化
    toString() {
        let str = '';
        let current = this.head;

        while (current) {
            str += ' ' + current.data
            current = current.next;
        }

        return str
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }

}

class Node {
    constructor(data) {
        this.next = null;
        this.data = data
    }
}


//测试

const singeLinkLisk = new SingeLinkLisk();

singeLinkLisk.append('1');
singeLinkLisk.append('2');
singeLinkLisk.append('3');
singeLinkLisk.append('4');
singeLinkLisk.insert(4, '5');
singeLinkLisk.insert(5, '6');
singeLinkLisk.insert(4, '7');
singeLinkLisk.insert(3, '8');
singeLinkLisk.update(1, '8');
singeLinkLisk.removeAt(1);
console.log('单链表源元素：', singeLinkLisk)
console.log('单链表源元素：', singeLinkLisk.toString())
singeLinkLisk.removeAt(1);
console.log('单链表removeAt=', singeLinkLisk.toString())
// console.log('单链表get(5)=', singeLinkLisk.get(5))
console.log('单链表indexOf(5)=', singeLinkLisk.indexOf('5'))
// console.log('单链表=', singeLinkLisk)

