"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="Telemetry.ts"/>
var net_1 = require("net");
var LogHandler_1 = require("./LogHandler");
var Telemetry_1 = require("./Telemetry");
var GatewayClient = /** @class */ (function () {
    function GatewayClient(host, port) {
        this.connected = false;
        this.host = host;
        this.port = port;
    }
    /**
     * Method to connect to a linux socket and bind listeners to it
     * @param {(err: Error) => void} connectCallback
     */
    GatewayClient.prototype.connect = function (connectCallback) {
        var _this = this;
        this.clientSocket = net_1.createConnection(this.port, this.host, function () {
            _this.connected = true;
            _this.clientSocket.addListener("data", function (data) {
                var telemetry = GatewayClient.bufferToTelemetry(data);
                if (_this.dataListener)
                    _this.dataListener(telemetry);
            });
            _this.clientSocket.addListener("close", function (had_error) {
                //Analyse
                GatewayClient.log.log("Connection was closed with " + had_error ? "an" : "no" + "errors");
            });
            _this.clientSocket.addListener("end", function () {
                //cleanup
                GatewayClient.log.log("Connection ended!");
            });
            connectCallback(null);
        });
        //Outside connect, since connect could throw an error
        this.clientSocket.addListener("error", function (err) {
            connectCallback(err);
        });
    };
    //Set internal data listener for event chain
    GatewayClient.prototype.setDataListener = function (listener) {
        this.dataListener = listener;
    };
    GatewayClient.bufferToTelemetry = function (buffer) {
        var data = buffer.toString('utf8');
        console.log("New client data: START " + data + " END");
        return Telemetry_1.Telemetry.parse(data);
    };
    GatewayClient.log = LogHandler_1.LogHandler.getInstance();
    return GatewayClient;
}());
exports.GatewayClient = GatewayClient;
