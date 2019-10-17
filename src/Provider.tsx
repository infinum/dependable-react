import * as React from 'react';
import { InjectionContext } from './InjectionContext';
import { DefineModule, GenerateTestBed } from './module';
import { ScopeToken } from './ScopeToken';
import { TProvider } from './types';

interface IProviderProps {
  children: any;
  providers: Array<TProvider>;
  scope?: ScopeToken | string;
  parentScope?: ScopeToken;
  test?: boolean;
}

export const Provider: React.FC<IProviderProps> = ({ children, parentScope, providers, scope, test }) => {
  const contextScope = React.useContext(InjectionContext);
  const parentScopeId = parentScope || (test ? undefined : contextScope);
  const moduleScopeId = scope || (test ? undefined : new ScopeToken('CONTEXT_SCOPE'));

  const moduleScope = test
    ? GenerateTestBed(providers, moduleScopeId, parentScopeId)
    : DefineModule(providers, moduleScopeId, parentScopeId);

  return <InjectionContext.Provider value={moduleScope}>{React.Children.only(children)}</InjectionContext.Provider>;
};
