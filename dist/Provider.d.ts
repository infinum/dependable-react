import * as React from 'react';
import { ScopeToken } from './ScopeToken';
import { TProvider } from './types';
interface IProviderProps {
    children: any;
    providers: Array<TProvider>;
    scope?: ScopeToken | string;
    parentScope?: ScopeToken;
}
export declare const Provider: React.FC<IProviderProps>;
export {};
