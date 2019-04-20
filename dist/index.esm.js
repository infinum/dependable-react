import { useMemo } from 'react';

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

var ClearableWeakMap = /** @class */ (function () {
    function ClearableWeakMap(init) {
        this._wm = new WeakMap(init);
    }
    ClearableWeakMap.prototype.clear = function () {
        this._wm = new WeakMap();
    };
    ClearableWeakMap.prototype.get = function (k) {
        return this._wm.get(k);
    };
    ClearableWeakMap.prototype.has = function (k) {
        return this._wm.has(k);
    };
    ClearableWeakMap.prototype.set = function (k, v) {
        this._wm.set(k, v);
        return this;
    };
    return ClearableWeakMap;
}());
var mappings = new ClearableWeakMap([]);

function useInject(cls) {
    /* istanbul ignore next */
    return useMemo(function () { return inject(cls); }, [cls]);
}
function inject(cls) {
    var isInitialized = mappings.has(cls);
    if (!isInitialized) {
        throw new Error('Injectables have to be provided in a module.');
    }
    return mappings.get(cls);
}

function isSingleProvider(provider) {
    return (!('initValue' in provider) &&
        !('initFactory' in provider) &&
        !('initClass' in provider));
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

function DefineModule(providers) {
    for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
        var provider = providers_1[_i];
        var prov = preprocessProvider(provider);
        var providerToken = prov.provider;
        if ('initClass' in prov) {
            mappings.set(providerToken, new prov.initClass());
        }
        else if ('initValue' in prov) {
            mappings.set(providerToken, prov.initValue);
        }
        else if ('initFactory' in prov) {
            mappings.set(providerToken, prov.initFactory());
        }
    }
}
function GenerateTestBed(providers) {
    mappings.clear();
    return DefineModule(providers);
}

export { DefineModule, GenerateTestBed, InjectionToken, inject, useInject };
