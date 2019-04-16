# Dependable React

## Getting started

Note: `dependable-react` has a peer dependency to `react@^16.8.0`, so don't forget to install the latest React version:

```bash
npm install --save dependable-react react react-dom
```

## Usage

### DefineModule

```typescript
function DefineModule(providers: Array<TProvider>): void;
```

TODO

### GenerateTestBed

```typescript
function GenerateTestBed(providers: Array<TProvider>): void;
```

TODO

### InjectionToken

```typescript
new InjectionToken<T>(key: string);
```

TODO

### inject

```typescript
function inject<T>(cls: IConstructor<T> | InjectionToken<T>): T;
```

TODO

### useInject

```typescript
function useInject<T>(cls: IConstructor<T> | InjectionToken<T>): T;
```

TODO

### Polyfilling

The lib makes use of the following features that are not yet available everywhere. Based on your browser support, you might want to polyfill them:

  * [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
  * [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

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
