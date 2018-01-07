"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GatewayClient_1 = require("./GatewayClient");
var SocketServer_1 = require("./SocketServer");
var PhotoDirectoryWatcher_1 = require("./PhotoDirectoryWatcher");
var Base64Encoder_1 = require("./Base64Encoder");
var GatewayWrapper = /** @class */ (function () {
    function GatewayWrapper() {
    }
    GatewayWrapper.main = function () {
        var myWrapper = new GatewayWrapper();
        myWrapper.init();
        myWrapper.run();
    };
    GatewayWrapper.prototype.init = function () {
        this.gatewaySocket = new GatewayClient_1.GatewayClient("localhost", 6004);
        this.socketServer = new SocketServer_1.SocketServer(3000);
        this.photoWatcher = new PhotoDirectoryWatcher_1.PhotoDirectoryWatcher("C:\\Users\\Vierheller\\Pictures\\lora");
    };
    GatewayWrapper.prototype.run = function () {
        var _this = this;
        this.photoWatcher.setDownloadFinishedListener(function (path, fileName, photoTimestamp) {
            var base64Image = Base64Encoder_1.Base64Encoder.encode(path);
            //TODO update args
            _this.socketServer.sendImage(0, fileName, base64Image, photoTimestamp);
        });
    };
    return GatewayWrapper;
}());
exports.GatewayWrapper = GatewayWrapper;
