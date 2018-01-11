"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var LogHandler_1 = require("./LogHandler");
var GatewayClient = /** @class */ (function () {
    function GatewayClient(host, port) {
        this.log = LogHandler_1.LogHandler.getInstance();
        this.connected = false;
        this.host = host;
        this.port = port;
    }
    GatewayClient.prototype.connect = function (connectCallback) {
        var _this = this;
        this.clientSocket = net_1.createConnection(this.port, this.host, function () {
            _this.connected = true;
            _this.setDataListener(_this.dataListener);
            _this.clientSocket.addListener("close", function (had_error) {
                //Analyse
                _this.log.log("Connection was closed with " + had_error ? "an" : "no" + "errors");
            });
            _this.clientSocket.addListener("end", function () {
                //cleanup
                _this.log.log("Connection ended!");
            });
            connectCallback(null);
        });
        this.clientSocket.addListener("error", function (err) {
            connectCallback(err);
        });
    };
    GatewayClient.prototype.setDataListener = function (listener) {
        this.dataListener = listener;
        if (this.connected)
            this.clientSocket.addListener("data", listener);
    };
    //TODO
    GatewayClient.bufferToJSON = function (buffer) {
        return {};
    };
    return GatewayClient;
}());
exports.GatewayClient = GatewayClient;
