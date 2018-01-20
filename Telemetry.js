"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Telemetry = /** @class */ (function () {
    function Telemetry(data) {
        this.data = data;
        this.timestamp = new Date();
    }
    Telemetry.parse = function (dataString) {
        var json = JSON.parse(dataString);
        return new Telemetry(json);
    };
    Telemetry.prototype.getJSON = function () {
        var newJson = this.data;
        newJson.timestamp = this.timestamp.getMilliseconds();
        newJson.type = "telemetry";
        return newJson;
    };
    return Telemetry;
}());
exports.Telemetry = Telemetry;
