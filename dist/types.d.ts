import { InjectionToken } from './InjectionToken';
import { ScopeToken } from './ScopeToken';
export declare type IConstructor<T = any> = new (scope?: ScopeToken) => T;
export declare type TKey<T = any> = InjectionToken<T> | IConstructor<T>;
export declare type TComplexProvider<T = any> = {
    provider: TKey<T>;
    initValue: T;
} | {
    provider: TKey<T>;
    initFactory(scope?: ScopeToken): T;
} | {
    provider: TKey<T>;
    initClass: IConstructor<T>;
};
export declare type TProvider<T = any> = IConstructor<T> | TComplexProvider<T>;
