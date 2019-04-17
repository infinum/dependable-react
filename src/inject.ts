import { useMemo } from 'react';

import { mappings } from './mappings';
import { TKey } from './types';

export function useInject<T>(cls: TKey<T>): T {
  /* istanbul ignore next */
  return useMemo<T>(() => inject(cls), [cls]);
}

export function inject<T>(cls: TKey<T>): T {
  const isInitialized = mappings.has(cls);

  if (!isInitialized) {
    throw new Error('Injectables have to be provided in a module.');
  }

  return mappings.get(cls) as T;
}
