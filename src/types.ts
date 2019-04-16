import { InjectionToken } from './InjectionToken';

export type IConstructor<T = any> = new () => T;
export type TComplexProvider<T = any> =
  | {
    provider: IConstructor<T> | InjectionToken<T>;
    initValue: T;
  }
  | {
    provider: IConstructor<T> | InjectionToken<T>;
    initFactory(): T;
  }
  | {
    provider: IConstructor<T> | InjectionToken<T>;
    initClass: T;
  };
export type TProvider<T = any> = IConstructor<T> | TComplexProvider<T>;