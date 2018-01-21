"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogAdapter = /** @class */ (function () {
    function LogAdapter(line) {
        this.line = line;
        this.timestamp = new Date();
    }
    LogAdapter.prototype.getJSON = function () {
        return this.toJSON();
    };
    LogAdapter.prototype.toJSON = function () {
        var newJson = {};
        newJson.data = this.line;
        newJson.timestamp = this.timestamp.getTime();
        newJson.type = "log";
        return newJson;
    };
    return LogAdapter;
}());
exports.LogAdapter = LogAdapter;
//# sourceMappingURL=LogAdapter.js.map