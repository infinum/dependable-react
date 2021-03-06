# Dependable React

## Getting started

Note: `dependable-react` has a peer dependency to `react@^16.8.0`, so don't forget to install the latest React version:

```bash
npm install --save dependable-react react react-dom
```

## Usage

### DefineModule

Use this to setup your services/tokens/factories/... that will later be injected. Take care that you can't inject anything before defining it. You can define:

- A class (that will be a singleton when injected)
- A value (e.g. `window`)
- A factory (method that will be called)

You can also define a parent scope to enable scope nesting.

```typescript
function DefineModule(providers: Array<TProvider>, scope?: ScopeToken | string, parentScope?: ScopeToken): ScopeToken;
```

```typescript
class DataService {
  public load() {}
}

DefineModule([
  DataService, // Short hand
  {
    provider: DataService,
    initClass: DataService,
  },
]);
```

### InjectionProvider

A provider that creates a new scope and passes it to the `useInject` automatically. This enables structural scoping without worying about the scope tokens.

```typescript
function InjectionProvider(options: {
  providers: Array<TProvider>;
  scope?: ScopeToken | string;
  parentScope?: ScopeToken;
});
```

```typescript
const App = () => (
  <InjectionProvider provider={[DataService]}>
    <SomeComponent />
  </InjectionProvider>
);
```

### GenerateTestBed

When testing your code that depends on something (e.g. `DataService`) you can't use `DefineModule` since it's a global thing. Use `GenerateTestBead` in a `beforeEach` hook.

```typescript
function GenerateTestBed(
  providers: Array<TProvider>,
  scope?: ScopeToken | string,
  parentScope?: ScopeToken,
): ScopeToken;
```

```typescript
import { DataService } from '../';

const STORAGE_TOKEN = new InjectionToken<Storage>();

beforeEach(() => {
  class FakeDataService {
    public load() {}
  }

  GenerateTestBed([
    {
      provider: DataService,
      initClass: FakeDataService,
    },
    {
      provider: STORAGE_TOKEN,
      initFactory: () => {
        if (window.require && window.require('electron')) {
          return new ElectronStoreService(window);
        }

        return new LocalStorageService();
      },
    },
  ]);
});
```

### InjectionToken

If for some reason you don't want to use the exact dependency for storing the value (e.g. `window`) you can use `InjectionToken` instead.

```typescript
new InjectionToken<T>(key: string);
```

```typescript
const WINDOW_TOKEN = new InjectionToken<Window>();

DefineModule([
  {
    provider: WINDOW_TOKEN,
    initValue: window,
  },
]);
```

### inject

Use this for injecting stuff in non-react code.

```typescript
function inject<T>(cls: IConstructor<T> | InjectionToken<T>, scope?: ScopeToken): T;
```

```typescript
class SomeService {}

class DataService {
  private someService = inject(SomeService);
}
```

**⚠️Note: ⚠️** Take care when defining modules to define them in the order of injection. The previous exapmle would only work as this:

```typescript
DefineModule([SomeService, DataService]);
```

### useInject

```typescript
function useInject<T>(cls: IConstructor<T> | InjectionToken<T>, scope?: ScopeToken): T;
```

## Scope & SSR support

In order to support Server-side rendering and other use cases that require multiple scopes, there is a possibility to define a specific scope.

The scope will be passed to the class as the constructor argument or to a factory as a function argument. That way the class or factory can pass it to inject if they need it.

### useContextInject

```typescript
function useContextInject<T>(cls: TKey<T>, contextKey: Context<ScopeToken>): T;
```

To make things simpler with React, the most likely case is to pass the scope through the React context. To avoid two operations (`useContext` to get the scope, and then `useInject`), there is one more react hook called `useContextInject`.

TODO

### Polyfilling

The lib makes use of the following features that are not yet available everywhere. Based on your browser support, you might want to polyfill them:

- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

[![Build Status](https://travis-ci.org/infinum/dependable-react.svg?branch=master)](https://travis-ci.org/infinum/dependable-react)
[![Greenkeeper badge](https://badges.greenkeeper.io/infinum/dependable-react.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/dependable-react.svg)](https://badge.fury.io/js/dependable-react)
[![Dependency Status](https://david-dm.org/infinum/dependable-react.svg)](https://david-dm.org/infinum/dependable-react)
[![DevDependency Status](https://david-dm.org/infinum/dependable-react/dev-status.svg)](https://david-dm.org/infinum/dependable-react#info=devDependencies)

## License

The [MIT License](LICENSE)

## Credits

dependable-react is maintained and sponsored by
[Infinum](https://www.infinum.co).

<img src="https://infinum.co/infinum.png" width="264">
