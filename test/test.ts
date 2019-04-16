import { DefineModule, inject, InjectionToken } from '../src/index';

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
