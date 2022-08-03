// 定义：当持续触发事件时，保证隔间时间触发一次事件。
// 1. 懒加载、滚动加载、加载更多或监听滚动条位置；
// 2. 百度搜索框，搜索联想功能；
// 3. 防止高频点击提交，防止表单重复提交；

const throttle = (fn, wait, immediate) => {
  let timer = null;
  let pre = new Date().getTime();
  return (...args) => {
    let newTime = new Date().getTime();
    if (immediate && !timer) {
      immediate = false;
      pre = newTime;
      fn.call(this, ...args);
    }

    if (newTime - pre >= wait) {
      pre = newTime;
      fn.call(this, ...args);
    }
  };
};
const betterFn = throttle(() => console.log('fn 节流执行了'), 1000, true);
window.addEventListener('mousemove', betterFn);
