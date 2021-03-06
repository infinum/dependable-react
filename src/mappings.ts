import { ScopeToken } from './ScopeToken';
import { TKey } from './types';

export class DependencyMap<T = any> {
  private _wm: WeakMap<TKey<T>, T>;

  constructor() {
    this._wm = new WeakMap();
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

export const mappings = new WeakMap<ScopeToken, DependencyMap>();
