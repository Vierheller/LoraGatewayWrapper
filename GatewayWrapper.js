"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GatewayClient_1 = require("./GatewayClient");
var SocketServer_1 = require("./SocketServer");
var PhotoDirectoryWatcher_1 = require("./PhotoDirectoryWatcher");
var Base64Encoder_1 = require("./Base64Encoder");
var ContinuousLogFileWatcher_1 = require("./ContinuousLogFileWatcher");
var Image_1 = require("./Image");
var Log_1 = require("./Log");
var GatewayWrapper = /** @class */ (function () {
    function GatewayWrapper() {
    }
    GatewayWrapper.main = function () {
        var myWrapper = new GatewayWrapper();
        myWrapper.init();
        myWrapper.run();
    };
    //TODO update paths, hosts, urls
    GatewayWrapper.prototype.init = function () {
        this.gatewaySocket = new GatewayClient_1.GatewayClient("localhost", 6004);
        this.socketServer = new SocketServer_1.SocketServer(3000);
        this.photoWatcher = new PhotoDirectoryWatcher_1.PhotoDirectoryWatcher("C:\\Users\\Vierheller\\Pictures\\lora");
        this.logWatcher = new ContinuousLogFileWatcher_1.ContinuousLogFileWatcher("PathToLog");
    };
    GatewayWrapper.prototype.run = function () {
        var _this = this;
        this.gatewaySocket.connect(function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Connected to raw Socket");
        });
        this.gatewaySocket.setDataListener(function (data) {
            _this.socketServer.sendTelemetry(data);
        });
        this.photoWatcher.setDownloadFinishedListener(function (path, fileName, photoTimestamp) {
            var base64Image = Base64Encoder_1.Base64Encoder.encode(path);
            var image = new Image_1.Image(fileName, base64Image);
            //TODO update args
            _this.socketServer.sendImage(image);
        });
        this.logWatcher.setOnNewLineListener(function (line) {
            var log = new Log_1.Log(line);
            _this.socketServer.sendLog(log);
        });
        this.logWatcher.watch();
    };
    return GatewayWrapper;
}());
exports.GatewayWrapper = GatewayWrapper;
