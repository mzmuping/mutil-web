/**
 * JS实现深拷贝（包括日期类型的和正则类型）
 */
export function cloneDeeps(target) {
  let newTarget;
  console.log(target.constructor);
  let tag = Object.prototype.toString.call(target);
  const Ctor = target.constructor;
  switch (tag) {
    case '[object Object]':
      newTarget = {};
      for (let key in target) {
        newTarget[key] = cloneDeeps(target[key]);
      }
      break;
    case '[object Array]':
      newTarget = [];
      for (let key in target) {
        newTarget[key] = cloneDeeps(target[key]);
      }
      break;
    case '[object Date]':
      newTarget = new Ctor(+target);
      break;

    default:
      newTarget = target;
      break;
  }
  return newTarget;
}
