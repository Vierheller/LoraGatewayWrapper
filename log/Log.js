"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log(line) {
        this.line = line;
        this.timestamp = new Date();
    }
    Log.prototype.toJSON = function () {
        var json = JSON.parse("{}");
        json["line"] = this.line;
        json["timestamp"] = this.timestamp;
        return json;
    };
    return Log;
}());
exports.Log = Log;
