"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logging_1 = require("../util/Logging");
var Telemetry = /** @class */ (function () {
    function Telemetry(data) {
        this.timestamp = new Date();
        this.incomingData = data;
        this.outgoingData = this.convertIncomingToOutgoing();
    }
    Telemetry.parse = function (dataString) {
        var json = JSON.parse(dataString);
        return new Telemetry(json);
    };
    /**
     *
     * $$DHBW(payload),91(package_counter),15:42:16(time),49.51846(lat),8.50398(lon),00132(alt),1(speed),0(direction),
     * 9(satellites),29.5(temp_chip),0.0(battery_voltage),11.199(current_voltage),24.2(temp_case),
     * 1012(pressure),0.0(humidity),23.6(extern_temp)*1CA6
     * @param {string} sentence
     */
    Telemetry.convertSentence = function (sentence) {
        sentence = sentence.substr(2); // Cut $$
        var sentenceSplit = sentence.split("*"); // Separate message from checksum
        var message = sentenceSplit[0];
        var checksum = sentenceSplit[1];
        var messageSplit = message.split(",");
        var json = {};
        json.payload = messageSplit[0];
        json.package_counter = Number(messageSplit[1]);
        json.time = messageSplit[2];
        json.lat = Number(messageSplit[3]);
        json.lon = Number(messageSplit[4]);
        json.alt = Number(messageSplit[5]);
        json.speed = Number(messageSplit[6]);
        json.direction = Number(messageSplit[7]);
        json.satellites = Number(messageSplit[8]);
        json.temp_chip = Number(messageSplit[9]);
        json.battery_voltage = Number(messageSplit[10]);
        json.current_voltage = Number(messageSplit[11]);
        json.temp_case = Number(messageSplit[12]);
        json.pressure = Number(messageSplit[13]);
        json.humidity = Number(messageSplit[14]);
        json.temp_extern = Number(messageSplit[15]);
        json.cda = Number(messageSplit[16]);
        json.pred_lat = Number(messageSplit[17]);
        json.pred_lng = Number(messageSplit[18]);
        json.pred_landing_speed = Number(messageSplit[19]);
        json.pred_time_to_landing = Number(messageSplit[20]);
        json.checksum = checksum;
        return json;
    };
    Telemetry.prototype.getOutgoingJSON = function () {
        return this.outgoingData;
    };
    Telemetry.prototype.getIncomingJSON = function () {
        return this.incomingData;
    };
    Telemetry.prototype.convertIncomingToOutgoing = function () {
        var sentenceData = Telemetry.convertSentence(this.incomingData.sentence);
        var json = {};
        json.class = this.incomingData.class;
        json.index = this.incomingData.index;
        json.channel = this.incomingData.channel;
        json.payload = sentenceData.payload;
        json.package_counter = sentenceData.package_counter;
        json.time = sentenceData.time;
        json.lat = sentenceData.lat;
        json.lon = sentenceData.lon;
        json.alt = sentenceData.alt;
        json.speed = sentenceData.speed;
        json.direction = sentenceData.direction;
        json.satellites = sentenceData.satellites;
        json.temp_chip = sentenceData.temp_chip;
        json.battery_voltage = sentenceData.battery_voltage;
        json.current_voltage = sentenceData.current_voltage;
        json.temp_case = sentenceData.temp_case;
        json.pressure = sentenceData.pressure;
        json.humidity = sentenceData.humidity;
        json.temp_extern = sentenceData.temp_extern;
        json.cda = sentenceData.cda;
        json.pred_lat = sentenceData.pred_lat;
        json.pred_lng = sentenceData.pred_lng;
        json.pred_landing_speed = sentenceData.pred_landing_speed;
        json.pred_time_to_landing = sentenceData.pred_time_to_landing;
        json.timestamp = this.timestamp.getTime();
        json.type = "telemetry";
        return json;
    };
    Telemetry.Log = Logging_1.Logging.getInstance(Telemetry.toString());
    return Telemetry;
}());
exports.Telemetry = Telemetry;
//# sourceMappingURL=TelemetryAdapter.js.map