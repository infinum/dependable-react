import { TKey } from './types';

class ClearableWeakMap<T = any> {
  private _wm: WeakMap<TKey<T>, T>;

  constructor(init: Iterable<any>) {
    this._wm = new WeakMap(init);
  }

  public clear() {
    this._wm = new WeakMap();
  }

  public delete<U extends T>(k: TKey<U>) {
    return this._wm.delete(k);
  }

  public get<U extends T>(k: TKey<U>) {
    return this._wm.get(k) as U | undefined;
  }

  public has<U extends T>(k: TKey<U>) {
    return this._wm.has(k);
  }

  public set<U extends T>(k: TKey<U>, v: U) {
    this._wm.set(k, v);
    return this;
  }
}

export const mappings = new ClearableWeakMap([]);
