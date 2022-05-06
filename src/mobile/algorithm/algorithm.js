/**
 * 1. 判断字符只有 '()','[]','{}',
 * 2. 而且是对称一堆
 * @param {*} str
 * @returns
 */

/**
 * 自己是现实，效率太低了
 * @param {*} str
 * @returns
 */
function isValid(str) {
  if (!str || str.length % 2 != 0) return false;
  let mapx = {
    '[': ']',
    '(': ')',
    '{': '}'
  };
  let arr = str.split('');

  while (arr.length > 0) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      let item = arr[i];
      let next = arr[i + 1];
      if (mapx[item] === next) {
        arr.splice(i, 2);
        break;
      }
      if (i >= len - 2) {
        return false;
      }
    }
  }

  return true;
}

/**
 * 实现的，效率搞
 * @param {s} s 字符串
 * @returns boolean
 */
function isValid2(s) {
  let items = [];
  let len = s.length;
  if (len % 2 != 0) return false;
  for (let i = 0; i < len; i++) {
    let letter = items[items.length - 1];
    switch (s[i]) {
      case '(':
        items.push('(');
        break;
      case '[':
        items.push('[');
        break;
      case '{':
        items.push('{');
        break;
      case ')':
        if (letter === '(') {
          items.pop();
        }
        break;
      case ']':
        if (letter === '[') {
          items.pop();
        }
        break;
      case '}':
        if (letter === '{') {
          items.pop();
        }
        break;
    }
  }
  return items.length === 0;
}

let test1 = '({{{{{{{{{[[[[[[[[[(((((((((((())))))))))))]]]]]]]]]}}}}}}}}})'; // true
let test2 = '(){}[]'; // true
let test3 = '(]'; // false
let test4 = '{()}'; // true
let test5 = '{[(){}]()}'; // false
console.log('isValid=====');
console.log(isValid(test1));
console.log(isValid(test2));
console.log(isValid(test3));
console.log(isValid(test4));
console.log(isValid(test5));

console.log('isValid2=====');

console.log(isValid2(test1));
console.log(isValid2(test2));
console.log(isValid2(test3));
console.log(isValid2(test4));
console.log(isValid2(test5));

function cloneDeep(obj) {
  if (!obj) return {};
  let newObj = {};
  let typeString = Object.prototype.toString.call(obj);
  if (typeString === '[object Object]') {
    for (let i in obj) {
      if (typeof obj[i] === 'object') {
        newObj[i] = cloneDeep(obj[i]);
      } else {
        newObj[i] = obj[i];
      }
    }
  } else if (typeString === '[object Array]') {
    newObj = [];
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'object') {
        newObj[i] = cloneDeep(obj[i]);
      } else {
        newObj[i] = obj[i];
      }
    }
  } else {
    return obj;
  }

  return newObj;
}

let obj = {
  a: {
    b: {
      c: 1
    },
    d: [1, 2, 4, 5, 6, 7],
    f: () => {},
    s: null,
    u: undefined
  }
};
console.log(cloneDeep(obj));
console.log(JSON.stringify(obj));
console.log(JSON.stringify());

/**
 * loadImg
 */
function loadImg(src) {
  // let img = new Image();

  return new Promise((resolve, reject) => {
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //   console.log(xhr);
    //   console.log('DONE: ', xhr.status);
    //   if
    // };
    // xhr.open('GET', src, true);
    // xhr.send();
    // xhr.onerror = (event) => {
    //   reject(event);
    // };
    let img = new Image();
    img.src = src;
    document.body.appendChild(img);
    img.onload = function () {
      resolve('请求成功');
    };

    img.onerror = function (err) {
      reject(err);
    };
  });
}

loadImg('https://lmg.jj20.com/up/allimg/4k/s/02/2109242332225H9-0-lp.jpg')
  .then((res) => {
    console.log('请求成功', res);
  })
  .catch((err) => {
    console.log('请求失败', err);
  });

/**
 * 首屏计算时间
 */

const observerData = [];

let observer = new MutationObserver(() => {
  // 计算每次DOM修改时，距离页面刚开始加载的时间
  const start = window.performance.timing.navigationStart;
  const time = new Date().getTime() - start;
  const body = document.querySelector('body');
  const score = computedScore(body, 1);
  observerData.push({
    score,
    time
  });

  // complete时去调用 unmountObserver
  if (document.readyState === 'complete') {
    // 只计算10秒内渲染时间
    unmountObserver(10000);
  }
});
observer.observe(document, {
  childList: true,
  subtree: true
});

function computedScore(element, layer) {
  let score = 0;
  const tagName = element.tagName;
  // 排除这些标签的情况
  if (
    tagName !== 'SCRIPT' &&
    tagName !== 'STYLE' &&
    tagName !== 'META' &&
    tagName !== 'HEAD'
  ) {
    const children = element.children;
    if (children && children.length) {
      // 递归计算分数
      for (let i = 0; i < children.length; i++) {
        score += computedScore(children[i], layer + 1);
      }
    }

    score += 1 + 0.5 * layer;
  }
  return score;
}

// 计算首屏时间
function getFirstScreenTime() {
  let data = null;
  for (let i = 1; i < observerData.length; i++) {
    // 计算幅度
    const differ = observerData[i].score - observerData[i - 1].score;
    // 取最大幅度，记录对应时间
    if (!data || data.rate <= differ) {
      data = {
        time: observerData[i].time,
        rate: differ
      };
    }
  }
  return data;
}

let timer = null;

function unmountObserver(delay) {
  if (timer) return;
  timer = setTimeout(() => {
    // 输出首屏时间
    console.log('输出首屏时间=', getFirstScreenTime());
    // 终止MutationObserver的监控
    observer.disconnect();
    observer = null;
    clearTimeout(timer);
  }, delay);
}
