"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogHandler = /** @class */ (function () {
    function LogHandler() {
    }
    LogHandler.prototype.LogHandler = function () {
    };
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
        console.log(message, optionalParams);
    };
    return LogHandler;
}());
exports.LogHandler = LogHandler;
