import * as React from 'react';

import { InjectionToken } from './InjectionToken';
import { mappings } from './mappings';
import { IConstructor } from './types';

export function useInject<T>(cls: IConstructor<T> | InjectionToken<T>) {
  return React.useMemo<T>(() => inject(cls), [cls]);
}

export function inject<T>(cls: IConstructor<T> | InjectionToken<T>): T {
  const isInitialized = mappings.has(cls);

  if (!isInitialized) {
    throw new Error('Injectables have to be provided in a module.');
  }

  return mappings.get(cls);
}
