import { Dep } from './dep';

export function ref(val) {
  return new Dep(val);
}
