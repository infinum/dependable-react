import { useMemo } from 'react';

import { DEFAULT_SCOPE } from './consts';
import { mappings } from './mappings';
import { TKey } from './types';

export function useInject<T>(cls: TKey<T>, scope: object = DEFAULT_SCOPE): T {
  /* istanbul ignore next */
  return useMemo<T>(() => inject(cls, scope), [cls]);
}

export function inject<T>(cls: TKey<T>, scope: object = DEFAULT_SCOPE): T {
  const map = mappings.get(scope);
  if (!map) {
    throw new Error('The given scope is not defined');
  }

  const isInitialized = map.has(cls);

  if (!isInitialized) {
    throw new Error('Injectables have to be provided in a module.');
  }

  return map.get(cls) as T;
}
