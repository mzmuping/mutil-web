// import { globby } from 'globby'
import ePub from 'epubjs';
import '@/print.js';
import './index.less';
import './队列.js';
// const pdf = require("../../assets/package.opf")
import './模仿pipe与compose.js';
import './搜索旋转排序数组.js';
import './栈结构.js';
// let book = ePub(
//   'https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf'
// );
// let rendition = book.renderTo('viewer', {
//   manager: 'continuous',
//   flow: 'paginated',
//   width: '100%',
//   height: '100%',
//   snap: true,
// });

// let displayed = rendition.display('chapter_001.xhtml');

// console.log(ePub);
const book = ePub(
  'https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf'
);
let bookReady = null;
const rendition = book.renderTo('viewer', {
  flow: 'paginated',
  manager: 'continuous', // continuous double
  width: '100%',
  height: '100%',
  // snap: true,
});
book.ready.then(() => {
  // rendition.display();
  rendition.display('chapter_001.xhtml');
  bookReady = true;
  console.log('bookReady===', bookReady);
});

let arrs = [1, 1, 1, 1, 2, 3, 4, 1, 1, 1, 1];
// 去重
arrs = arrs.filter((item, index, arr) => {
  return arr.indexOf(item, 0) === index;
});

console.log('arrs=', arrs);
