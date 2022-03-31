let currentEffect;

export class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(newVal) {
    this._val = newVal;
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

/**
 *
 * @param {effect Function} effect
 */
export function effectWatch(effect) {
  currentEffect = effect;
  effect();
}
