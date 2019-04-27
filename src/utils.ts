import { IConstructor, TComplexProvider, TProvider } from './types';

function isSingleProvider<T>(provider: IConstructor<T>): true;
function isSingleProvider<T>(provider: TComplexProvider<T>): false;
function isSingleProvider<T>(provider: TProvider<T>): boolean {
  return !('initValue' in provider) && !('initFactory' in provider) && !('initClass' in provider);
}

export function preprocessProvider<T = any>(provider: TProvider<T>): TComplexProvider<T> {
  if (isSingleProvider<T>(provider as IConstructor)) {
    return {
      initClass: provider as IConstructor<T>,
      provider: provider as IConstructor<T>,
    };
  }
  return provider as TComplexProvider<T>;
}
