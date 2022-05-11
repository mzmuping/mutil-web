let currentEffect;

// 依赖
export class Dep {
    constructor(val) {
        this.effects = new Set();
        this._val = val;
    }

    get value() {
        this.depend();
        return this._val;
    }

    set value(value) {
        this._val = value;
        this.notice();
    }

    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect);
        }
    }

    notice() {
        this.effects.forEach((effect) => {
            effect();
        });
    }
}

export function effectWatch(fn) {
    currentEffect = fn;
    fn();
}
