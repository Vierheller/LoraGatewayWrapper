"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// <reference path="./TelemetryAdapter.ts"/>
var net_1 = require("net");
var Logging_1 = require("../util/Logging");
var TelemetryAdapter_1 = require("./TelemetryAdapter");
var GatewayClient = /** @class */ (function () {
    function GatewayClient(host, port) {
        this.lastPackageCount = 0;
        this.connected = false;
        this.host = host;
        this.port = port;
    }
    GatewayClient.bufferToTelemetry = function (buffer) {
        var data = buffer.toString("utf8");
        // GatewayClient.Log.log("Received incomingData: " + data);
        if (data.indexOf("\n") > -1) {
            // GatewayClient.Log.log("New client incomingData has multiple lines");
            var split = data.split("\n");
            // for (let i = 0; i < split.length; i++) {
            // GatewayClient.Log.log("New client incomingData fraction [" + i + "]: START " + split[i] + " END");
            // }
            return TelemetryAdapter_1.Telemetry.parse(split[0]);
        }
        else {
            // GatewayClient.Log.log("New client incomingData: START " + data + " END");
            return TelemetryAdapter_1.Telemetry.parse(data);
        }
    };
    /**
     * Method to connect to a linux socket and bind listeners to it
     * @param {(err: Error) => void} connectCallback
     */
    GatewayClient.prototype.connect = function (connectCallback) {
        var _this = this;
        this.clientSocket = net_1.createConnection(this.port, this.host, function () {
            _this.connected = true;
            GatewayClient.Log.log("Connected to Gateway");
            _this.clientSocket.addListener("data", function (data) {
                var telemetry = GatewayClient.bufferToTelemetry(data);
                if (_this.dataListener && telemetry.getOutgoingJSON().package_counter > _this.lastPackageCount) {
                    GatewayClient.Log.log("Got direct and forward:" + telemetry.getOutgoingJSON().package_counter);
                    _this.lastPackageCount = telemetry.getOutgoingJSON().package_counter;
                    _this.dataListener(telemetry);
                }
            });
            _this.clientSocket.addListener("close", function (hadError) {
                // Analyse
                GatewayClient.Log.log("Connection was closed with " + hadError ? "an" : "no" + "errors");
            });
            _this.clientSocket.addListener("end", function () {
                // cleanup
                GatewayClient.Log.log("Connection ended!");
            });
            connectCallback(null);
        });
        // Outside connect, since connect could throw an error
        this.clientSocket.addListener("error", function (err) {
            connectCallback(err);
        });
    };
    // Set internal incomingData listener for event chain
    GatewayClient.prototype.setDataListener = function (listener) {
        this.dataListener = listener;
    };
    GatewayClient.Log = Logging_1.Logging.getInstance(GatewayClient.toString());
    return GatewayClient;
}());
exports.GatewayClient = GatewayClient;
//# sourceMappingURL=GatewayClient.js.map