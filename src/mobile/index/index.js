// import { globby } from 'globby';
import ePub from 'epubjs'
import img from '@/src/assets/01.png'
import '@/print.js'
import './index.less'
import './队列.js'
// const pdf = require("../../assets/package.opf")
import './搜索旋转排序数组.js'
import './栈结构.js'
import './单链表.js'
var book = ePub(
  'https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf'
)
let bookReady
const rendition = book.renderTo('viewer', {
  flow: 'paginated',
  manager: 'continuous', //continuous double
  width: '100%',
  height: '100%',
  // script: 'allow'
  snap: true,
})
book.ready.then(() => {
  rendition.display()
  bookReady = true
})
