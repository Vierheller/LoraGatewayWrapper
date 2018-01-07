"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GatewayClient_1 = require("./GatewayClient");
var SocketServer_1 = require("./SocketServer");
var GatewayWrapper = /** @class */ (function () {
    function GatewayWrapper() {
    }
    GatewayWrapper.main = function () {
        var myWrapper = new GatewayWrapper();
        myWrapper.init();
    };
    GatewayWrapper.prototype.init = function () {
        this.gatewaySocket = new GatewayClient_1.GatewayClient("localhost", 6004);
        this.socketServer = new SocketServer_1.SocketServer(3000);
    };
    return GatewayWrapper;
}());
exports.GatewayWrapper = GatewayWrapper;
