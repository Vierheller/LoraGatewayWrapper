"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = require("socket.io");
var SocketServer = /** @class */ (function () {
    function SocketServer(port) {
        this.port = port;
        this.httpServer = http.createServer();
        this.socketServer = server(this.httpServer, {
            path: '/',
            serveClient: false
        });
        this.listen();
    }
    SocketServer.prototype.listen = function () {
        var _this = this;
        this.httpServer.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.onConnect(this.socketServer);
    };
    SocketServer.prototype.onConnect = function (socketServer) {
        var _this = this;
        socketServer.on('connect', function (socket) {
            console.log('Client connected on port %s.', _this.port);
            _this.socketClient = socket;
            _this.socketClient.emit("event", "Irgend ne scheiße halt");
            _this.socketClient.on('disconnect', function () {
                console.log('Client disconnected');
                _this.socketClient = null;
            });
        });
    };
    SocketServer.prototype.sendOverSocket = function (json) {
        console.log("Sending data to clients: " + json);
        if (this.socketClient) {
            this.socketClient.emit("event", JSON.stringify(json));
        }
    };
    SocketServer.prototype.sendImage = function (image) {
        this.sendOverSocket(image.toJSON());
    };
    SocketServer.prototype.sendLog = function (log) {
        this.sendOverSocket(log.toJSON());
    };
    SocketServer.prototype.sendTelemetry = function (data) {
        this.sendOverSocket(data.getJSON());
    };
    return SocketServer;
}());
exports.SocketServer = SocketServer;
