/**
 * 虚拟vdom 转换 为真实dom
 * @param {*} vnode
 * @param {*} container
 * @param {*} flag => 表示返回创建element
 */
export function mountElement(vnode, container, flag) {
  const { tag, props, children } = vnode;
  // tag
  let element;
  if (tag === null) {
    return mountTextNode(vnode, container, flag);
  } else {
    element = vnode.el = document.createElement(tag);
  }
  // props

  if (props) {
    for (let key in props) {
      let val = props[key];
      element.setAttribute(key, val);
    }
  }
  // children
  // 1. 可以是string
  // 2. 可以是数组
  if (typeof children === 'string') {
    let textNode = document.createTextNode(vnode.children);
    element.appendChild(textNode);
  } else if (Array.isArray(children)) {
    children.forEach((vnode) => {
      mountElement(vnode, element);
    });
  }
  if (flag) {
    return element;
  }
  container.appendChild(element);
}

/**
 * 创建类型为text
 * @param {*} vnode
 * @param {*} container
 * @param {*} flag => 表示返回创建element
 */
export function mountTextNode(vnode, container, flag) {
  let textNode = (vnode.el = document.createTextNode(vnode.children));
  if (flag) {
    return textNode;
  }
  container.appendChild(textNode);
}

/**
 *
 * @param {n1} oldNode 旧节点
 * @param {n2} oldNode 新节点
 */
export function diff(n1, n2) {
  let el = (n2.el = n1.el);
  // tag
  if (n1.tag !== n2.tag) {
    el.replaceWith(mountElement(n2, null, true));
  }
  // props

  // children
}
