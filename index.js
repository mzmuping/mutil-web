// import { globby } from 'globby';

const axios = require('axios');
import img from './src/assets/01.png'
import './print.js'

var div = document.createElement('div')
var imgs = document.createElement('img')
div.innerHTML = '你好！'
imgs.src = img
document.body.appendChild(div);
document.body.appendChild(imgs);
