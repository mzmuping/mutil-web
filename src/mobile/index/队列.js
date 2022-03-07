class Queue{

  items=[];

  //添加
  enqueue(element){
    this.items.push(element)
  }
  /**
   * 删除第一个
   */
  dequeue(){
    return this.items.shift();
  }

  //查看第一个元素
  front(){
    return this.items[0]
  }

  //查看大小
  size(){
    return this.items.length
  }

  toString(){
    let str = ''
    this.items.forEach(el=>{
      str += " "+el
    })
    return str;
  }



}


const queue = new Queue()
queue.enqueue('sfsf')
console.log(queue.front())