// import { globby } from 'globby';
import ePub from 'epubjs'
import img from '@/src/assets/01.png'
import '@/print.js'
import './index.less'
// const pdf = require("../../assets/package.opf")
var book = ePub('https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf');
let bookReady;
const rendition = book.renderTo("viewer", {
    flow: "paginated",
    manager: "continuous",
    width: '100%',
    height: '100%',
    snap: true,
});
book.ready.then(() => {
    rendition.display();
    bookReady = true;
});
