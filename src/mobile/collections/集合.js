//封装集合类
class Set {
    constructor() {
        //属性
        this.items = {}
    }

    add(value) {
        if (this.has(value)) return false;

        this.items[value] = value;
        return true
    }

    has(value) {
        return this.items.hasOwnProperty(value)
    }

    remove(value) {
        if (!this.has(value)) return false;
        delete this.items[value]
        return true
    }

    clear() {
        this.items = {}
    }

    size() {
        return Object.keys(this.items).length
    }

    values() {
        return Object.values(this.items)
    }

}

const set = new Set();


console.log(set.add('abc'));
console.log(set.add('abc'));
console.log(set.add('开始'));
console.log(set.add('结束'));
console.log(set.add('455'));
console.log(set.add('565'));
console.log(set.values());
console.log(set.remove('455'));
console.log(set.size('455'));
console.log(set.values());
