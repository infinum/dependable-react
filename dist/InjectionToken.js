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
export { InjectionToken };
//# sourceMappingURL=InjectionToken.js.map