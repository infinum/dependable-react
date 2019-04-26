import { ScopeToken } from './ScopeToken';
import { InjectionToken } from './InjectionToken';

export const DEFAULT_SCOPE = new ScopeToken('DEFAULT_SCOPE');
export const PARENT_SCOPE_KEY = new InjectionToken<ScopeToken>('PARENT_SCOPE');
