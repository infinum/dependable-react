import {
  DefineModule,
  inject,
  InjectionToken,
  GenerateTestBed,
} from '../src/index';

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

  expect(() => inject(FakeClass)).toThrowError(
    'Injectables have to be provided in a module.',
  );
});

it('should clear the mappings with TestBed', () => {
  class FakeClass {}
  DefineModule([FakeClass]);

  const fc = inject(FakeClass);
  expect(fc).toBeInstanceOf(FakeClass);

  GenerateTestBed([]);

  expect(() => inject(FakeClass)).toThrowError(
    'Injectables have to be provided in a module.',
  );
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

it('Should work with multiple scopes', () => {
  const SCOPE_A = {};
  const SCOPE_B = {};
  const TOKEN = new InjectionToken<string>();

  class ProxyClass {
    public service = inject(TOKEN, this.scope);

    constructor(private scope?: object) { }
  }

  DefineModule([
    {
      initValue: 'A',
      provider: TOKEN,
    },
    ProxyClass,
  ], SCOPE_A);

  DefineModule([
    {
      initValue: 'B',
      provider: TOKEN,
    },
    ProxyClass,
  ], SCOPE_B);

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
