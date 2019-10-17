import * as React from 'react';
import { InjectionContext } from './InjectionContext';
import { DefineModule } from './module';
import { ScopeToken } from './ScopeToken';
import { TProvider } from './types';

interface IProviderProps {
  children: any;
  providers: Array<TProvider>;
  scope?: ScopeToken | string;
  parentScope?: ScopeToken;
}

export const Provider: React.FC<IProviderProps> = ({ children, parentScope, providers, scope }) => {
  const moduleScopeId = scope || new ScopeToken('CONTEXT_SCOPE');

  const moduleScope = DefineModule(providers, moduleScopeId, parentScope);

  return <InjectionContext.Provider value={moduleScope}>{React.Children.only(children)}</InjectionContext.Provider>;
};
