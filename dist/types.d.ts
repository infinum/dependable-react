import { InjectionToken } from './InjectionToken';
export declare type IConstructor<T = any> = new () => T;
export declare type TKey<T = any> = InjectionToken<T> | IConstructor<T>;
export declare type TComplexProvider<T = any> = {
    provider: TKey<T>;
    initValue: T;
} | {
    provider: TKey<T>;
    initFactory(): T;
} | {
    provider: TKey<T>;
    initClass: IConstructor<T>;
};
export declare type TProvider<T = any> = IConstructor<T> | TComplexProvider<T>;
