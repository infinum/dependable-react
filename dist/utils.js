function isSingleProvider(provider) {
    return (!('initValue' in provider) &&
        !('initFactory' in provider) &&
        !('initClass' in provider));
}
export function preprocessProvider(provider) {
    if (isSingleProvider(provider)) {
        return {
            initClass: provider,
            provider: provider,
        };
    }
    return provider;
}
//# sourceMappingURL=utils.js.map