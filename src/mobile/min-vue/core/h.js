/**
 * 创建虚拟 vdom vnode
 * @param {vnod object} 节点对象
 * @param {el dom} 容器
 */

export function h(tag, props, children) {
  return {
    tag,
    props,
    children
  };
}
