function Animal(name, age) {
  this.name = name;
  this.age = age;
  this.sleep = function () { };
}

// 构建函数继承
function Person(name, age) {
  Animal.call(this, name, age); // 继承属性，方法，丢失原型链属性，方法
}
// 原型链继承
Person.prototype = new Animal();
Person.prototype.constructor = Person; // 修复构造函数指向

// 构造函数继承+ 原型继承 是组合继承

// 寄生继承
let Person2 = Object.create(Animal.prototype);
