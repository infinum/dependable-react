import { ScopeToken } from './ScopeToken';
import { TKey } from './types';
export declare function useInject<T>(cls: TKey<T>, scope?: ScopeToken): T;
export declare function inject<T>(cls: TKey<T>, scope?: ScopeToken): T;
