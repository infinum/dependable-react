import * as React from 'react';
import { ScopeToken } from './ScopeToken';
import { TProvider } from './types';
interface IProviderProps {
    children: React.ReactNode;
    providers: Array<TProvider>;
    scope?: ScopeToken | string;
    parentScope?: ScopeToken;
    test?: boolean;
}
export declare const Provider: React.FC<IProviderProps>;
export {};
