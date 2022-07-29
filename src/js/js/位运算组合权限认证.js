// 组合全选认证，举个例子虚拟dom的例子
// 一个虚拟dom有可能很多属性时动态，每个一个状态标记一个2进制位

import { Children } from 'react';

// 与（&）运算符 :两个二进制操作数对应位同为1 结果位 才为1，其余情况为0；
// 或（|）运算符 :两个二进制操作数对应位只要有一个为1 结果位 就为1，其余情况为0；
// 非（~）运算符 :一个二进制操作数，对应位为0，结果位为1；对应位为1，结果位为0；
// 异或（^）运算符:两个二进制操作数对应位相同为0，不同为1;
//! ! 转换成 boolean
let STYLE = 1; // 001
let CLASS = 1 << 1; // 010
let CHILDRENN = 1 << 2; // 100

// 授权 |
let vnodeType = STYLE | CLASS;

// 判断 &
console.log('vnodeType的类型 style', !!(vnodeType & STYLE));
console.log('vnodeType的类型 class', !!(vnodeType & CLASS));
console.log('vnodeType的类型 class', !!(vnodeType & CHILDRENN));

// 删除 ^
vnodeType = vnodeType ^ CLASS;
console.log('====================');
console.log('vnodeType的类型 style', !!(vnodeType & STYLE));
console.log('vnodeType的类型 class', !!(vnodeType & CLASS));
console.log('vnodeType的类型 class', !!(vnodeType & CHILDRENN));
