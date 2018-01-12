"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    {
        "class":"POSN",
        "index":0,
        "channel":1,
        "payload":"DHBW",
        "time":"00:00:00",
        "lat":0.00000,
        "lon":0.00000,
        "alt":0,
        "rate":0.0,
        "sentence":"$$DHBW,144,00:00:00,0.00000,0.00000,00000,0,0,0,21.5,0.0,11.199,21.6,1013,0.0,20.4*035F"}
*/
var Telemetry = /** @class */ (function () {
    function Telemetry() {
    }
    Telemetry.prototype.Telemetry = function (data) {
        this.class = data["class"];
        this.index = data["class"];
        this.channel = data["class"];
        this.payload = data["class"];
        this.time = data["class"];
        this.lat = data["class"];
        this.lon = data["class"];
        this.alt = data["class"];
        this.rate = data["class"];
        this.sentence = data["class"];
        this.json = data;
    };
    return Telemetry;
}());
exports.Telemetry = Telemetry;
