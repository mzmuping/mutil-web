// 是否是对象
export function isObject(target) {
  return typeof target === 'object' && target !== null;
}
// 是否改变
export function hasChanged(oldVal, newVal) {
  return oldVal !== newVal && !Number.isNaN(oldVal) && !Number.isNaN(newVal);
}
