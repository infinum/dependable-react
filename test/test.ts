import { DefineModule, inject, InjectionToken, GenerateTestBed } from '../src/index';
import { ScopeToken } from '../src/ScopeToken';

it('should be able to define and inject a class module', () => {
  class FakeClass {}
  DefineModule([
    {
      provider: FakeClass,
      initClass: FakeClass,
    },
  ]);

  const fc = inject(FakeClass);
  expect(fc).toBeInstanceOf(FakeClass);
});

it('should be able to define and inject a class module using shorthand', () => {
  class FakeClass {}
  DefineModule([FakeClass]);

  const fc = inject(FakeClass);
  expect(fc).toBeInstanceOf(FakeClass);
});

it('should be able to define and inject a value module', () => {
  const tokenValue = '123';
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: tokenValue,
    },
  ]);

  const value = inject(TOKEN);
  expect(value).toBe(tokenValue);
});

it('should be able to define and inject a factory module', () => {
  const tokenValue = '123';
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initFactory: () => tokenValue,
    },
  ]);

  const value = inject(TOKEN);
  expect(value).toBe(tokenValue);
});

it('should throw if nothing was provided', () => {
  class FakeClass {}
  GenerateTestBed([]);

  expect(() => inject(FakeClass)).toThrowError('Injectables have to be provided in a module.');
});

it('should clear the mappings with TestBed', () => {
  class FakeClass {}
  DefineModule([FakeClass]);

  const fc = inject(FakeClass);
  expect(fc).toBeInstanceOf(FakeClass);

  GenerateTestBed([]);

  expect(() => inject(FakeClass)).toThrowError('Injectables have to be provided in a module.');
});

it('should be able to name InjectionToken', () => {
  const tokenValue = '123';
  const TOKEN = new InjectionToken<string>(tokenValue);
  const TOKEN_NAMELESS = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: tokenValue,
    },
    {
      provider: TOKEN_NAMELESS,
      initValue: tokenValue,
    },
  ]);

  const value = inject(TOKEN);
  expect(value).toBe(tokenValue);
  expect(TOKEN.toString()).toBe(`InjectionToken(${tokenValue})`);
});

it('should be able to name ScopeToken', () => {
  const FIRST_TOKEN = new ScopeToken('First!');
  const tokenValue = '123';
  const TOKEN = new ScopeToken(tokenValue);
  expect(FIRST_TOKEN.toString()).toBe(`ScopeToken(First!)`);
  expect(TOKEN.toString()).toBe(`ScopeToken(${tokenValue})`);
});

it('Should work with multiple scopes', () => {
  const SCOPE_A = new ScopeToken('A');
  const TOKEN = new InjectionToken<string>();

  class ProxyClass {
    public service = inject(TOKEN, this.scope);

    constructor(private scope?: ScopeToken) {}
  }

  DefineModule(
    [
      {
        initValue: 'A',
        provider: TOKEN,
      },
      ProxyClass,
    ],
    SCOPE_A,
  );

  const SCOPE_B = DefineModule(
    [
      {
        initValue: 'B',
        provider: TOKEN,
      },
      ProxyClass,
    ],
    'B',
  );

  DefineModule([
    {
      initValue: 'C',
      provider: TOKEN,
    },
    ProxyClass,
  ]);

  expect(inject(ProxyClass, SCOPE_A).service).toBe('A');
  expect(inject(ProxyClass, SCOPE_B).service).toBe('B');
  expect(inject(ProxyClass).service).toBe('C');
});

it('Should throw if the scope is not defined', () => {
  const UNDEFINED_SCOPE = new ScopeToken();
  const TOKEN = new InjectionToken<string>();

  DefineModule([
    {
      initValue: 'C',
      provider: TOKEN,
    },
  ]);

  expect(() => inject(TOKEN, UNDEFINED_SCOPE)).toThrow();
});

it('Should work with multiple scopes', () => {
  const SCOPE_A = new ScopeToken('A');
  const TOKEN_A = new InjectionToken<string>();
  const TOKEN_B = new InjectionToken<string>();

  class ProxyClass {
    public service = inject(TOKEN_A, this.scope);

    constructor(private scope?: ScopeToken) {}
  }

  const PARENT = DefineModule(
    [
      {
        initValue: 'B',
        provider: TOKEN_A,
      },
      {
        initValue: 'b',
        provider: TOKEN_B,
      },
    ],
    'Parent',
  );

  DefineModule(
    [
      {
        initValue: 'A',
        provider: TOKEN_A,
      },
      ProxyClass,
    ],
    SCOPE_A,
    PARENT,
  );

  const SCOPE_B = DefineModule([ProxyClass], 'B', PARENT);

  const SCOPE_C = DefineModule([], 'C');

  expect(inject(ProxyClass, SCOPE_A).service).toBe('A');
  expect(inject(ProxyClass, SCOPE_B).service).toBe('B');
  expect(inject(TOKEN_B, SCOPE_B)).toBe('b');
  expect(() => inject(TOKEN_B, SCOPE_C)).toThrow();
});
