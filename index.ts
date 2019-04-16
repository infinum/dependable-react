import React from 'react';

const mappings = new Map();
type IConstructor<T> = new () => T;

// tslint:disable-next-line: export-name
export function useInject<T>(cls: IConstructor<T>) {
  return React.useMemo<T>(() => inject(cls), [cls]);
}

export function inject<T>(cls: IConstructor<T>): T {
  const isInnted = mappings.has(cls);

  if (!isInnted) {
    mappings.set(cls, new cls());
  }

  return mappings.get(cls);
}
