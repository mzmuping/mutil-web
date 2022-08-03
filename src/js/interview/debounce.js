// 定义：触发事件后在n秒内函数只能执行一次，如果在n秒内又触发了事件，则会重新计算函数执行时间。
// 搜索框搜索输入。只需用户最后一次输入完，再发送请求
// 手机号、邮箱验证输入检测 onchange oninput事件
// 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

const debounce = (fn, wait, immediate) => {
  let timer = null;
  return (...args) => {
    if (immediate && !timer) {
      immediate = false;
      fn.apply(this, args);
    }
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000, true);
document.addEventListener('scroll', betterFn);
