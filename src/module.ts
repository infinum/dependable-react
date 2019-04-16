import { mappings } from './mappings';
import { TProvider } from './types';
import { preprocessProvider } from './utils';

export function DefineModule(providers: Array<TProvider>): void {
  for (const provider of providers) {
    const prov = preprocessProvider(provider);
    const providerToken = prov.provider;
    if ('initClass' in prov) {
      mappings.set(providerToken, new prov.initClass());
    } else if ('initValue' in prov) {
      mappings.set(providerToken, prov.initValue);
    } else if ('initFactory' in prov) {
      mappings.set(providerToken, prov.initFactory());
    }
  }
}

export function GenerateTestBed(providers: Array<TProvider>): void {
  mappings.clear();
  return DefineModule(providers);
}
