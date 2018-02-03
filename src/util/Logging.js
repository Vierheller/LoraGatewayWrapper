"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var ConfigHolder_1 = require("../config/ConfigHolder");
var Logging = /** @class */ (function () {
    function Logging(className) {
        this.className = className;
        Logging.writer = new winston_1.Logger({
            transports: [
                new winston_1.transports.Console({
                    colorize: true,
                    timestamp: true,
                }),
                new winston_1.transports.File({ timestamp: true, filename: ConfigHolder_1.ConfigHolder.config.logfile_name }),
            ],
        });
    }
    Logging.getInstance = function (className) {
        if (!Logging.instance) {
            Logging.instance = new Logging(className);
        }
        return Logging.instance;
    };
    Logging.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logging.writer.info("[" + this.className + "]" + message, args);
    };
    Logging.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logging.writer.error("[" + this.className + "]" + message, args);
    };
    return Logging;
}());
exports.Logging = Logging;
//# sourceMappingURL=Logging.js.map