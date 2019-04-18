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
export var mappings = new ClearableWeakMap([]);
//# sourceMappingURL=mappings.js.map