/**
 * 把虚拟节点转换为真实节点, vdom - dom
 * @param {vnod object} 虚拟节点对象
 * @param {el dom} 容器
 */

export function mountElement(vnod, container, flag) {
    const { tag, props, children } = vnod;
    // //

    // tag
    let element;
    if (tag === null) {
        return mountTextNode(vnod, container, flag);
    } else {
        element = vnod.el = document.createElement(tag);
    }

    // props
    if (props) {
        for (let key in props) {
            element.setAttribute(key, props[key]);
        }
    }

    // children
    // 1. 可以接受string
    // 2. 可以接受数组

    if (typeof children === 'string') {
        let textNode = document.createTextNode(children);
        element.appendChild(textNode);
    } else if (Array.isArray(children)) {
        children.forEach((vnod) => {
            mountElement(vnod, element);
        });
    }
    if (flag) {
        return element;
    }
    container.appendChild(element);
}
// 创建text
export function mountTextNode(vnod, container, flag) {
    const textNode = (vnod.el = document.createTextNode(vnod.children));
    if (flag) {
        return textNode;
    }
    container.appendChild(textNode);
}

/**
 * diff 算法
 * @param {n1} oldVnode
 * @param {n2} newVnode
 */
export function diff(n1, n2) {
    console.log(n1, n2);
    // tag
    let el = (n2.el = n1.el);
    if (n1.tag !== n2.tag) {
        n1.el.replaceWith(mountElement(n2, null, true));
    } else {
        // props

        let { props: oldProps } = n1;
        let { props: newProps } = n2;

        if (newProps && oldProps) {
            Object.keys(newProps).forEach((key) => {
                let newVal = newProps[key];
                let oldVal = oldProps[key];
                if (oldVal !== newVal) {
                    n1.el.setAttribute && n1.el.setAttribute(key, newVal);
                }
            });
        }

        if (oldProps) {
            Object.keys(oldProps).forEach((key) => {
                if (!newProps[key]) {
                    n1.el.removeAttribute && n1.el.removeAttribute(key);
                }
            });
        }

        // children
        // newVNode ==>string(oldVNode =>string ,array)
        // newVNode ==>array(oldVNode =>string ,array)

        let { children: oldChildren } = n1;
        let { children: newChildren } = n2;

        if (typeof newChildren === 'string') {
            if (typeof oldChildren === 'string') {
                if (newChildren !== oldChildren) {
                    el.textContent = newChildren;
                }
            } else if (Array.isArray(oldChildren)) {
                el.innerHTML = '';
                mountElement(n2, el);
            }
        } else if (Array.isArray(newChildren)) {
            if (typeof oldChildren === 'string') {
                el.innerHTML = '';
                mountElement(n2, el);
            } else if (Array.isArray(oldChildren)) {
                let min = Math.min(oldChildren.length, newChildren.length);

                for (let i = 0; i < min; i++) {
                    const newVnode = newChildren[i];
                    const oldVnode = oldChildren[i];
                    diff(oldVnode, newVnode);
                }

                if (newChildren.length > min) {
                    for (let i = min; i < newChildren.length; i++) {
                        let vnode = newChildren[i];
                        mountElement(vnode, el);
                    }
                }

                if (oldChildren.length > min) {
                    for (let i = min; i < oldChildren.length; i++) {
                        let oldVnode = oldChildren[i];
                        // oldVnode.el.parentElement.removeChild(oldVnode.el);
                        oldVnode.el.remove();
                    }
                }
            }
        }
    }
}
