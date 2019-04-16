import { IConstructor, TComplexProvider, TProvider } from './types';

export function isSingleProvider(provider: IConstructor): true;
export function isSingleProvider(provider: TComplexProvider): false;
export function isSingleProvider(provider: IConstructor | TComplexProvider) {
  return (
    !('initValue' in provider) &&
    !('initFactory' in provider) &&
    !('initClass' in provider)
  );
}
