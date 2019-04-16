// tslint:disable: export-name
// tslint:disable: ban-types
// tslint:disable: no-construct

import React from 'react';

const mappings = new WeakMap();
type IConstructor<T = any> = new () => T;
type TProvider<T = any> =
  | IConstructor<T>
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

export function useInject<T>(cls: IConstructor<T>) {
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

  constructor(key: string) {
    this.key = new String(key);
  }
}

export function GenerateRootModule(providers: Array<TProvider>) {
  return null;
}

export function GenerateScopedModule(providers: Array<TProvider>) {
  return null;
}

export function GenerateTestBed(providers: Array<TProvider>) {
  return null;
}
