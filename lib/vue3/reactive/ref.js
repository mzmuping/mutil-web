import { track, trigger } from './effect';
import { isObject, hasChanged } from '../utils';
import { reactive } from './reactive';
export function ref(value) {
  if (isRef(value)) {
    return value;
  }

  return new Reflect(value);
}

export function isRef(value) {
  return !!(value && value._isRef);
}
// 转换
export function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

class Reflect {
  constructor(value) {
    this._isRef = false;
    this._value = convert(value);
  }

  get value() {
    track(this, 'value');
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(this._value, newValue)) {
      this._value = convert(newValue);
      trigger(this, 'value');
    }
  }
}
