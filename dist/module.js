import { mappings } from './mappings';
import { preprocessProvider } from './utils';
export function DefineModule(providers) {
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
export function GenerateTestBed(providers) {
    mappings.clear();
    return DefineModule(providers);
}
//# sourceMappingURL=module.js.map