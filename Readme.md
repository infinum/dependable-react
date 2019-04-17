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

```typescript
function DefineModule(providers: Array<TProvider>): void;
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

### GenerateTestBed

When testing your code that depends on something (e.g. `DataService`) you can't use `DefineModule` since it's a global thing. Use `GenerateTestBead` in a `beforeEach` hook.

```typescript
function GenerateTestBed(providers: Array<TProvider>): void;
```

```typescript
import { DataService } from '../';

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
      provider: new ,
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
function inject<T>(cls: IConstructor<T> | InjectionToken<T>): T;
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
function useInject<T>(cls: IConstructor<T> | InjectionToken<T>): T;
```

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
