"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logging_1 = require("../util/Logging");
var ConfigHolder = /** @class */ (function () {
    function ConfigHolder() {
    }
    ConfigHolder.getConfigFromFile = function () {
        return require("./config.json");
    };
    ConfigHolder.config = ConfigHolder.getConfigFromFile();
    ConfigHolder.Log = Logging_1.Logging.getInstance(ConfigHolder.toString());
    return ConfigHolder;
}());
exports.ConfigHolder = ConfigHolder;
//# sourceMappingURL=ConfigHolder.js.map