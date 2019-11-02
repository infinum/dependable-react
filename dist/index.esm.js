import { createContext, useContext, useMemo, createElement } from 'react';

var InjectionToken = /** @class */ (function () {
    function InjectionToken(key) {
        if (key === void 0) { key = ''; }
        this.key = new String(key);
    }
    InjectionToken.prototype.toString = function () {
        return "InjectionToken(" + this.key + ")";
    };
    return InjectionToken;
}());

var ScopeToken = /** @class */ (function () {
    function ScopeToken(key) {
        if (key === void 0) { key = ''; }
        this.key = new String(key);
    }
    ScopeToken.prototype.toString = function () {
        return "ScopeToken(" + this.key + ")";
    };
    return ScopeToken;
}());

var DEFAULT_SCOPE = new ScopeToken('DEFAULT_SCOPE');
var PARENT_SCOPE_KEY = new InjectionToken('PARENT_SCOPE');

var DependencyMap = /** @class */ (function () {
    function DependencyMap() {
        this._wm = new WeakMap();
    }
    DependencyMap.prototype.get = function (k) {
        return this._wm.get(k);
    };
    DependencyMap.prototype.has = function (k) {
        return this._wm.has(k);
    };
    DependencyMap.prototype.set = function (k, v) {
        this._wm.set(k, v);
        return this;
    };
    return DependencyMap;
}());
var mappings = new WeakMap();

var InjectionContext = createContext(DEFAULT_SCOPE);

function useInject(cls, scope) {
    var contextScope = useContext(InjectionContext);
    var moduleScope = scope || contextScope;
    /* istanbul ignore next */
    return useMemo(function () { return inject(cls, moduleScope); }, [cls, moduleScope]);
}
function inject(cls, scope) {
    if (scope === void 0) { scope = DEFAULT_SCOPE; }
    var map = mappings.get(scope);
    if (!map) {
        throw new Error('The given scope is not defined');
    }
    var isInitialized = map.has(cls);
    if (!isInitialized) {
        if (map.has(PARENT_SCOPE_KEY)) {
            return inject(cls, map.get(PARENT_SCOPE_KEY));
        }
        throw new Error('Injectables have to be provided in a module.');
    }
    return map.get(cls);
}

function isSingleProvider(provider) {
    return !('initValue' in provider) && !('initFactory' in provider) && !('initClass' in provider);
}
function preprocessProvider(provider) {
    if (isSingleProvider(provider)) {
        return {
            initClass: provider,
            provider: provider,
        };
    }
    return provider;
}

function DefineModule(providers, scope, parentScope) {
    if (scope === void 0) { scope = DEFAULT_SCOPE; }
    var scopeToken = scope instanceof ScopeToken ? scope : new ScopeToken(scope);
    if (!mappings.has(scopeToken)) {
        mappings.set(scopeToken, new DependencyMap());
    }
    var map = mappings.get(scopeToken);
    if (!map) {
        /* istanbul ignore next */
        throw new Error("Something went wrong - Dependency map couldn't be generated");
    }
    if (parentScope) {
        if (map.has(PARENT_SCOPE_KEY)) {
            throw new Error("Parent scope can't be redefined");
        }
        map.set(PARENT_SCOPE_KEY, parentScope);
    }
    for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
        var provider = providers_1[_i];
        var prov = preprocessProvider(provider);
        var providerToken = prov.provider;
        if ('initClass' in prov) {
            map.set(providerToken, new prov.initClass(scopeToken));
        }
        else if ('initValue' in prov) {
            map.set(providerToken, prov.initValue);
        }
        else if ('initFactory' in prov) {
            map.set(providerToken, prov.initFactory(scopeToken));
        }
    }
    return scopeToken;
}
function GenerateTestBed(providers, scope, parentScope) {
    if (scope === void 0) { scope = DEFAULT_SCOPE; }
    var scopeToken = scope instanceof ScopeToken ? scope : new ScopeToken(scope);
    mappings.set(scopeToken, new DependencyMap());
    return DefineModule(providers, scopeToken, parentScope);
}

var Provider = function (_a) {
    var children = _a.children, parentScope = _a.parentScope, providers = _a.providers, scope = _a.scope, test = _a.test;
    var contextScope = useContext(InjectionContext);
    var parentScopeId = parentScope || (test ? undefined : contextScope);
    var moduleScopeId = scope || (test ? undefined : new ScopeToken('CONTEXT_SCOPE'));
    var moduleScope = test
        ? GenerateTestBed(providers, moduleScopeId, parentScopeId)
        : DefineModule(providers, moduleScopeId, parentScopeId);
    return createElement(InjectionContext.Provider, { value: moduleScope }, children);
};

export { DefineModule, GenerateTestBed, Provider as InjectionProvider, InjectionToken, inject, useInject };
