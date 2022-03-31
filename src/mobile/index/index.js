// import { globby } from 'globby'
import ePub from 'epubjs';
import '@/print.js';
import './index.less';
import './队列.js';
// const pdf = require("../../assets/package.opf")
import './模仿pipe与compose.js';
import './搜索旋转排序数组.js';
import './栈结构.js';
const book = ePub(
  'https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf'
);
let bookReady = null;
const rendition = book.renderTo('viewer', {
  flow: 'paginated',
  manager: 'continuous', // continuous double
  width: '100%',
  height: '100%',
  // script: 'allow'
  snap: true
});
book.ready.then(() => {
  rendition.display();
  bookReady = true;
  console.log(bookReady);
});
