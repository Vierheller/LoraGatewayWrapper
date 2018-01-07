"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var GatewayClient = /** @class */ (function () {
    function GatewayClient(host, port) {
        this.host = host;
        this.port = port;
    }
    GatewayClient.prototype.connect = function (connectListener, dataListener, errorListener) {
        this.clientSocket = net_1.createConnection(this.port, this.host, connectListener);
        this.clientSocket.addListener("connect", connectListener);
        this.clientSocket.addListener("data", dataListener);
        this.clientSocket.addListener("error", errorListener);
        this.clientSocket.addListener("close", function (had_error) {
            //Analyse
        });
        this.clientSocket.addListener("end", function () {
            //cleanup
        });
    };
    return GatewayClient;
}());
exports.GatewayClient = GatewayClient;
