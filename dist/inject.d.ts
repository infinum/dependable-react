import { Context } from 'react';
import { ScopeToken } from './ScopeToken';
import { TKey } from './types';
export declare function useInject<T>(cls: TKey<T>, scope?: ScopeToken): T;
export declare function useContextInject<T>(cls: TKey<T>, contextKey: Context<ScopeToken>): T;
export declare function inject<T>(cls: TKey<T>, scope?: ScopeToken): T;
