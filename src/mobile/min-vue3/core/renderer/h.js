/**
 * 创建虚拟vdom,
 * @param {*} tag
 * @param {*} props
 * @param {*} children
 * @returns
 */
export function h(tag, props, children) {
  return {
    tag,
    props,
    children
  };
}
