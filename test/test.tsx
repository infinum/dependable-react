import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { DefineModule, InjectionToken, useInject, InjectionProvider } from '../src';
import { DEFAULT_SCOPE } from '../src/consts';
import { InjectionContext } from '../src/InjectionContext';

it('should work without the provider', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN);
    const scope = React.useContext(InjectionContext);

    return (
      <div>
        {fc} {scope.toString()}
      </div>
    );
  };

  const testRenderer = TestRenderer.create(<TestComponent />);

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['default', ' ', 'ScopeToken(DEFAULT_SCOPE)']);
});

it('should work with the provider', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN);
    const scope = React.useContext(InjectionContext);

    return (
      <div>
        {fc} {scope.toString()}
      </div>
    );
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider providers={[{ provider: TOKEN, initValue: 'injection' }]}>
      <TestComponent />
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['injection', ' ', 'ScopeToken(CONTEXT_SCOPE)']);
});

it('should work with the test provider', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN);
    const scope = React.useContext(InjectionContext);

    return (
      <div>
        {fc} {scope.toString()}
      </div>
    );
  };

  expect(() => {
    TestRenderer.create(
      <InjectionProvider test providers={[]}>
        <TestComponent />
      </InjectionProvider>,
    );
  }).toThrowError('Injectables have to be provided in a module.');
});

it('should work with the provider and default scope', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN, DEFAULT_SCOPE);

    return <div>{fc}</div>;
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider providers={[{ provider: TOKEN, initValue: 'injection' }]}>
      <TestComponent />
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['default']);
});

it('should work with the provider and a custom scope', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const CUSTOM_SCOPE = DefineModule(
    [
      {
        provider: TOKEN,
        initValue: 'custom',
      },
    ],
    'CUSTOM_SCOPE',
  );

  const TestComponent = () => {
    const fc = useInject(TOKEN, CUSTOM_SCOPE);
    const scope = React.useContext(InjectionContext);

    return (
      <div>
        {fc} {scope.toString()}
      </div>
    );
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider providers={[{ provider: TOKEN, initValue: 'injection' }]}>
      <TestComponent />
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['custom', ' ', 'ScopeToken(CONTEXT_SCOPE)']);
});

it('should work with the provider and a custom injected scope', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  DefineModule(
    [
      {
        provider: TOKEN,
        initValue: 'custom',
      },
    ],
    'CUSTOM_SCOPE',
  );

  const TestComponent = () => {
    const fc = useInject(TOKEN);
    const scope = React.useContext(InjectionContext);

    return (
      <div>
        {fc} {scope.toString()}
      </div>
    );
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider providers={[{ provider: TOKEN, initValue: 'injection' }]} scope="TEST">
      <TestComponent />
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['injection', ' ', 'ScopeToken(TEST)']);
});

it('should work with the provider and a custom parent scope', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const CUSTOM_SCOPE = DefineModule([
    {
      provider: TOKEN,
      initValue: 'custom',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN, CUSTOM_SCOPE);

    return <div>{fc}</div>;
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider providers={[]} parentScope={CUSTOM_SCOPE}>
      <TestComponent />
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['custom']);
});

it('should work with nested providers', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN);

    return <div>{fc}</div>;
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider
      providers={[
        {
          provider: TOKEN,
          initValue: 'level 1',
        },
      ]}
    >
      <InjectionProvider
        providers={[
          {
            provider: TOKEN,
            initValue: 'level 2',
          },
        ]}
      >
        <TestComponent />
      </InjectionProvider>
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['level 2']);
});

it('should work with nested providers and fallback', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN);

    return <div>{fc}</div>;
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider
      providers={[
        {
          provider: TOKEN,
          initValue: 'level 1',
        },
      ]}
    >
      <InjectionProvider providers={[]}>
        <TestComponent />
      </InjectionProvider>
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['level 1']);
});

it('should work with empty nested providers and fallback', () => {
  const TOKEN = new InjectionToken<string>();
  DefineModule([
    {
      provider: TOKEN,
      initValue: 'default',
    },
  ]);

  const TestComponent = () => {
    const fc = useInject(TOKEN);

    return <div>{fc}</div>;
  };

  const testRenderer = TestRenderer.create(
    <InjectionProvider providers={[]}>
      <InjectionProvider providers={[]}>
        <TestComponent />
      </InjectionProvider>
    </InjectionProvider>,
  );

  const renderedResults = testRenderer.toJSON();
  expect(renderedResults && renderedResults.children).toEqual(['default']);
});
