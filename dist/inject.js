import { useMemo } from 'react';
import { mappings } from './mappings';
export function useInject(cls) {
    /* istanbul ignore next */
    return useMemo(function () { return inject(cls); }, [cls]);
}
export function inject(cls) {
    var isInitialized = mappings.has(cls);
    if (!isInitialized) {
        throw new Error('Injectables have to be provided in a module.');
    }
    return mappings.get(cls);
}
//# sourceMappingURL=inject.js.map