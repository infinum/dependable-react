import { DEFAULT_SCOPE } from './consts';
import { mappings, DependencyMap } from './mappings';
import { TProvider } from './types';
import { preprocessProvider } from './utils';

export function DefineModule(providers: Array<TProvider>, scope: object = DEFAULT_SCOPE): void {
  if (!mappings.has(scope)) {
    mappings.set(scope, new DependencyMap());
  }
  const map = mappings.get(scope);
  if (!map) {
    throw new Error('Something went wrong - Dependency map couldn\'t be generated');
  }

  for (const provider of providers) {
    const prov = preprocessProvider(provider);
    const providerToken = prov.provider;
    if ('initClass' in prov) {
      map.set(providerToken, new prov.initClass(scope));
    } else if ('initValue' in prov) {
      map.set(providerToken, prov.initValue);
    } else if ('initFactory' in prov) {
      map.set(providerToken, prov.initFactory(scope));
    }
  }
}

export function GenerateTestBed(providers: Array<TProvider>, scope: object = DEFAULT_SCOPE): void {
  mappings.set(scope, new DependencyMap());
  return DefineModule(providers, scope);
}
