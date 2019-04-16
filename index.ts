import React from 'react';

const mappings = new WeakMap();
type IConstructor<T = any> = new () => T;
type TComplexProvider<T = any> =
  | {
      provider: IConstructor<T> | InjectionToken<T>;
      initValue: T;
    }
  | {
      provider: IConstructor<T> | InjectionToken<T>;
      initFactory(): T;
    }
  | {
      provider: IConstructor<T> | InjectionToken<T>;
      initClass: T;
    };
type TProvider<T = any> = IConstructor<T> | TComplexProvider<T>;

export function useInject<T>(cls: IConstructor<T> | InjectionToken<T>) {
  return React.useMemo<T>(() => inject(cls), [cls]);
}

export function inject<T>(cls: IConstructor<T> | InjectionToken<T>): T {
  const isInnted = mappings.has(cls);

  if (!isInnted) {
    throw new Error('Injectables have to be provided in a module.');
  }

  return mappings.get(cls);
}

export class InjectionToken<T> {
  private key: String;

  constructor(key: string = '') {
    this.key = new String(key);
  }
}

function isSingleProvider(provider: IConstructor): true;
function isSingleProvider(provider: TComplexProvider): false;
function isSingleProvider(provider: IConstructor | TComplexProvider) {
  return (
    !('initValue' in provider) &&
    !('initFactory' in provider) &&
    !('initClass' in provider)
  );
}

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
