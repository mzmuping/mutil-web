class LinkeList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(ele) {
    let newNode = new Node(ele);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length += 1;
  }

  toString() {
    let current = this.head;
    let listString = '';

    while (current) {
      listString += ' ' + current.data.toString();
      current = current.next;
    }
    return listString;
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
    this.data = data;
    this.next = null;
  }
}
