// JavaScript各种继承方式和优缺点。
function Animal(name, age) {
  this.name = name;
  this.age = age;
  this.types = ['脚', '眼睛'];
  this.sleep = function () {
    console.log('名字', this.name);
  };
}
Animal.prototype = {
  run: () => {
    console.log('run======');
  },
};

//
/**
 * 借用函数继承
 * 优点：
 *    1.避免了引用类型的属性被所有实例共享（原型链继承的缺点）
 * 缺点：
 *    1.方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 *
 */
// function Person(name, age) {
//    Animal.call(this, name, age); // 继承属性，方法，丢失原型链属性，方法
// }

/**
 * 原型链继承
 * 缺点：
 *    1.引用类型的属性被所有实例共享
 *       - this.types.push('毛') //所有实例都会有了
 *    2.不能传参给Animal
 */
// function Person(name, age) {}
// Person.prototype = new Animal();
// Person.prototype.constructor = Person; // 修复构造函数指向

// 构造函数继承+ 原型继承 是 组合继承
/**
 *  组合继承
 * 优点：
 *    1.融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
 *
 */

// function Person(name, age) {
//   Animal.call(this, name, age);
// }
// Person.prototype = new Animal();
// Person.prototype.constructor = Person; // 修复构造函数指向

/**
 * 4.原型式继承
 * 缺点：
 *    1. 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
 */
// function createObj(o) {
//   // Object.create() 的实现原理
//   function F() {}
//   F.prototype = o;

//   return new F();
// }

// let person = {
//   name: 'kevin',
//   friends: ['daisy', 'kelly'],
// };

// let person1 = createObj(person);
// let person2 = createObj(person);

// person1.name = 'person1';
// console.log(person2.name); // kevin

// person1.friends.push('taylor');
// console.log(person2.friends); // ["daisy", "kelly", "taylor"]

/**
 * 注意：修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，
 * 而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。
 */

/**
 * 5. 寄生式继承
 * 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
 * 缺点：
 *     1.跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
 * */

// function createObj(o) {
//   let clone = Object.create(o);

//   clone.sayName = function () {
//     console.log(111);
//   };

//   return clone;
// }

/**
 * 6.寄生组合式继承
 * 优点：
 *  1.解决组合继承最大的缺点是会调用两次父构造函数
 *  2.引用类型最理想的继承范式
 */

function Parent(name) {
  this.name = name;
  this.sayName = function () {
    console.log('你的名称：', this.name);
  };
}
function Child(name) {
  Parent.call(this, name);
}

function prototype(child, parent) {
  let prototype = Object.create(parent.prototype);
  prototype.contructror = child;
  child.prototype = prototype;
}

prototype(Child, Parent);

let child = new Child('嘛嘛嘛');

child.sayName();

// es6 class 被babel转换后就是寄生组合继承方式
