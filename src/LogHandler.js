"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogHandler = /** @class */ (function () {
    function LogHandler() {
    }
    LogHandler.getInstance = function () {
        return new LogHandler();
    };
    LogHandler.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.error(message, optionalParams);
    };
    LogHandler.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (optionalParams) {
            console.log(message, optionalParams);
        }
        else {
            console.log(message);
        }
    };
    LogHandler.prototype.LogHandler = function () {
        // Only to be singleton
    };
    return LogHandler;
}());
exports.LogHandler = LogHandler;
//# sourceMappingURL=LogHandler.js.map