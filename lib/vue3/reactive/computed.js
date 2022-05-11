import { effect, track, trigger } from './effect';
import { isFunction } from '../utils';
export function computed(getterOroption) {
    let getter, setter;
    if (isFunction(getterOroption)) {
        getter = getterOroption;
        setter = () => {
            console.warn('computed is readonly');
        };
    } else {
        getter = getterOroption.get;
        setter = getterOroption.set;
    }
    return new ComputedImpl(getter, setter);
}

class ComputedImpl {
    constructor(getter, setter) {
        this._setter = setter;
        this._value = undefined;
        this._dirty = true; // 从新计算
        // 依赖的effect
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                trigger(this, 'value');
                this._dirty = true;
            },
        });
    }

    get value() {
        if (this._dirty) {
            this._value = this.effect();
            track(this, 'value');
            this._dirty = false;
        }
        return this._value;
    }

    set value(newVal) {
        this._setter(newVal);
    }
}
