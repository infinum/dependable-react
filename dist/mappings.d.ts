import { ScopeToken } from './ScopeToken';
import { TKey } from './types';
export declare class DependencyMap<T = any> {
    private _wm;
    constructor();
    get<U extends T>(k: TKey<U>): U | undefined;
    has<U extends T>(k: TKey<U>): boolean;
    set<U extends T>(k: TKey<U>, v: U): this;
}
export declare const mappings: WeakMap<ScopeToken, DependencyMap<any>>;
