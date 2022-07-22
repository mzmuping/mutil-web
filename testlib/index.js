'use strict';

require('core-js/modules/es.function.name.js');

/* eslint-disable no-proto */
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }
// class Dog extends Animal {
//   constructor(name, age) {
//     super();
//     this.age = age;
//   }
//   run() {
//     console.log('跑');
//   }
// }
// class Cate extends Dog {
//   constructor(name, age) {
//     super();
//     this.age = age;
//   }
//   run() {
//     console.log('跑');
//   }
// }
// let dog = new Dog('小狗', 1);
// // eslint-disable-next-line no-proto
// console.log(Dog.__proto__ === Animal);
// console.log(Animal.__proto__ === Function.prototype);
// console.log(Cate.__proto__.__proto__.__proto__ === Function.prototype);
function Animal(name, age) {
  this.name = name;
  this.age = age;

  this.sleep = function () {};
} // 构建函数继承

function Person(name, age) {
  Animal.call(this, name, age); // 继承属性，方法，丢失原型链属性，方法
} // 原型链继承

Person.prototype = Object.create(Animal.prototype);
Person.prototype.constructor = Person; // 修复构造函数指向

Person.__proto__ = Animal;

function TC(name, age) {
  Person.call(this, name, age); // 继承属性，方法，丢失原型链属性，方法
}

TC.prototype = Object.create(Person.prototype);
TC.prototype.constructor = TC;
TC.__proto__ = Person;
console.log(TC.__proto__ === Person);
console.log(TC.__proto__.__proto__ === Animal);
console.log(TC.__proto__.__proto__.__proto__ === Function.prototype);

// 写一个防抖函数
function debounced(fn, await) {
  let timer = null;
  return function () {
    let _this = this;
    let arg = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, arg);
      timer = null;
    }, await);
  };
}
