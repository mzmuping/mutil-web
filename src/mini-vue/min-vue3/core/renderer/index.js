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
    } else {
        // props
        let { props: oldProps } = n1;
        let { props: newProps } = n2;
        if (oldProps && newProps) {
            Object.keys(newProps).forEach((key) => {
                if (newProps[key] !== oldProps[key]) {
                    el.setAttribute(key, newProps[key]);
                }
            });
        }
        if (oldProps) {
            Object.keys(oldProps).forEach((key) => {
                if (!newProps[key]) {
                    el.removeAttribute(key);
                }
            });
        }

        // children
        // newchildren => string (old==> string ,array)
        // newchildren => array (old==> string ,array)
        const { children: oldChildren } = n1;
        const { children: newChildren } = n2;

        if (typeof newChildren === 'string') {
            if (typeof oldChildren === 'string') {
                if (newChildren !== oldChildren) {
                    el.textContent = newChildren;
                }
            } else if (Array.isArray(oldChildren)) {
                el.innerHtml = '';
                oldChildren.forEach((vnode) => {
                    mountElement(vnode, el);
                });
            }
        } else if (Array.isArray(newChildren)) {
            if (typeof oldChildren === 'string') {
                el.innerHtml = '';
                newChildren.forEach((vnode) => {
                    mountElement(vnode, el);
                });
            } else if (Array.isArray(oldChildren)) {
                let min = Math.min(newChildren.length, oldChildren.length);

                for (let i = 0; i < min; i++) {
                    let oldNode = oldChildren[i];
                    let newNode = newChildren[i];
                    diff(oldNode, newNode);
                }

                if (newChildren.length > min) {
                    for (let i = min; i < newChildren.length; i++) {
                        mountElement(newChildren[i], el);
                    }
                }

                if (oldChildren.length > min) {
                    for (let i = min; i < oldChildren.length; i++) {
                        // oldChildren.el.parentHtml.removeChild(oldChildren.el);
                        oldChildren[i].el.remove();
                    }
                }
            }
        }
    }
}
