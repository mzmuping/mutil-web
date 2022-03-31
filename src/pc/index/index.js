import './index.less';
const div = document.createElement('div');
const imgs = document.createElement('img');
div.innerHTML = '你好！';
imgs.src = 'img';
document.body.appendChild(div);
document.body.appendChild(imgs);
Promise.resolve().finally();
