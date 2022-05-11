// 是否是对象
export function isObject(target) {
    return typeof target === 'object' && target !== null;
}
// 是否数组
export function isArray(target) {
    return Array.isArray(target);
}
// 是否函数
export function isFunction(target) {
    return typeof target === 'function';
}

// 是否改变
export function hasChanged(oldVal, newVal) {
    return oldVal !== newVal && !Number.isNaN(oldVal) && !Number.isNaN(newVal);
}
