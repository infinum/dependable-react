import { ScopeToken } from './ScopeToken';
import { TProvider } from './types';
export declare function DefineModule(providers: Array<TProvider>, scope?: ScopeToken | string, parentScope?: ScopeToken): ScopeToken;
export declare function GenerateTestBed(providers: Array<TProvider>, scope?: ScopeToken | string, parentScope?: ScopeToken): ScopeToken;
