"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigHolder = /** @class */ (function () {
    function ConfigHolder() {
    }
    ConfigHolder.getConfigFromFile = function () {
        return require('./config.json');
    };
    ConfigHolder.config = ConfigHolder.getConfigFromFile();
    return ConfigHolder;
}());
exports.ConfigHolder = ConfigHolder;
//# sourceMappingURL=ConfigHolder.js.map