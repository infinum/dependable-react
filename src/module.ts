import { DEFAULT_SCOPE, PARENT_SCOPE_KEY } from './consts';
import { mappings, DependencyMap } from './mappings';
import { ScopeToken } from './ScopeToken';
import { TProvider } from './types';
import { preprocessProvider } from './utils';

export function DefineModule(
  providers: Array<TProvider>,
  scope: ScopeToken | string = DEFAULT_SCOPE,
  parentScope?: ScopeToken,
): ScopeToken {
  const scopeToken = scope instanceof ScopeToken ? scope : new ScopeToken(scope);
  if (!mappings.has(scopeToken)) {
    mappings.set(scopeToken, new DependencyMap());
  }
  const map = mappings.get(scopeToken);
  if (!map) {
    /* istanbul ignore next */
    throw new Error("Something went wrong - Dependency map couldn't be generated");
  }

  if (parentScope) {
    if (map.has(PARENT_SCOPE_KEY)) {
      throw new Error("Parent scope can't be redefined");
    }
    map.set(PARENT_SCOPE_KEY, parentScope);
  }

  for (const provider of providers) {
    const prov = preprocessProvider(provider);
    const providerToken = prov.provider;
    if ('initClass' in prov) {
      map.set(providerToken, new prov.initClass(scopeToken));
    } else if ('initValue' in prov) {
      map.set(providerToken, prov.initValue);
    } else if ('initFactory' in prov) {
      map.set(providerToken, prov.initFactory(scopeToken));
    }
  }

  return scopeToken;
}

export function GenerateTestBed(
  providers: Array<TProvider>,
  scope: ScopeToken | string = DEFAULT_SCOPE,
  parentScope?: ScopeToken,
): ScopeToken {
  const scopeToken = scope instanceof ScopeToken ? scope : new ScopeToken(scope);
  mappings.set(scopeToken, new DependencyMap());
  return DefineModule(providers, scopeToken, parentScope);
}
