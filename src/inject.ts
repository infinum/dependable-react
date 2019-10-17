import { Context, useContext, useMemo } from 'react';

import { DEFAULT_SCOPE, PARENT_SCOPE_KEY } from './consts';
import { mappings } from './mappings';
import { ScopeToken } from './ScopeToken';
import { TKey } from './types';
import { InjectionContext } from './InjectionContext';

export function useInject<T>(cls: TKey<T>, scope?: ScopeToken): T {
  const contextScope = useContext(InjectionContext);
  const moduleScope = scope || contextScope || DEFAULT_SCOPE;
  /* istanbul ignore next */
  return useMemo<T>(() => inject(cls, moduleScope), [cls, moduleScope]);
}

export function useContextInject<T>(cls: TKey<T>, contextKey: Context<ScopeToken>): T {
  /* istanbul ignore next */
  const scope = useContext(contextKey);
  /* istanbul ignore next */
  return useInject(cls, scope);
}

export function inject<T>(cls: TKey<T>, scope: ScopeToken = DEFAULT_SCOPE): T {
  const map = mappings.get(scope);
  if (!map) {
    throw new Error('The given scope is not defined');
  }

  const isInitialized = map.has(cls);

  if (!isInitialized) {
    if (map.has(PARENT_SCOPE_KEY)) {
      return inject(cls, map.get(PARENT_SCOPE_KEY));
    }
    throw new Error('Injectables have to be provided in a module.');
  }

  return map.get(cls) as T;
}
