"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="Telemetrie.ts"/>
var net_1 = require("net");
var LogHandler_1 = require("./LogHandler");
var Telemetrie_1 = require("./Telemetrie");
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
                GatewayClient.log.log("new Data: " + data);
                var telemetry = GatewayClient.bufferToJSON(data);
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
    //TODO SAFE??? -> No typing
    GatewayClient.bufferToJSON = function (buffer) {
        var data = buffer.toString('utf8');
        GatewayClient.log.log("Gateway client data: " + data);
        var json = JSON.parse(data);
        return new Telemetrie_1.Telemetry(json);
    };
    GatewayClient.log = LogHandler_1.LogHandler.getInstance();
    return GatewayClient;
}());
exports.GatewayClient = GatewayClient;
