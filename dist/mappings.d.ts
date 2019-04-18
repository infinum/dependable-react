import { TKey } from './types';
declare class ClearableWeakMap<T = any> {
    private _wm;
    constructor(init: Iterable<any>);
    clear(): void;
    get<U extends T>(k: TKey<U>): U | undefined;
    has<U extends T>(k: TKey<U>): boolean;
    set<U extends T>(k: TKey<U>, v: U): this;
}
export declare const mappings: ClearableWeakMap<any>;
export {};
