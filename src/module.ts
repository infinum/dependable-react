import { mappings } from './mappings';
import { IConstructor, TComplexProvider, TProvider } from './types';
import { isSingleProvider } from './utils';

export function DefineModule(providers: Array<TProvider>) {
  for (const provider of providers) {
    if (isSingleProvider(provider as IConstructor)) {
      mappings.set(provider, new (provider as IConstructor)());
    } else {
      const prov = provider as TComplexProvider;
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

  return null;
}

export function GenerateTestBed(providers: Array<TProvider>) {
  throw new Error('Not implemented yet :)');
}
