"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = require("socket.io");
var SocketServer = /** @class */ (function () {
    function SocketServer(port) {
        this.port = port;
        this.httpServer = http.createServer();
        this.socketTelemetry = server(this.httpServer, {
            path: '/telemetry',
            serveClient: false
        });
        this.socketPhoto = server(this.httpServer, {
            path: '/photo',
            serveClient: false
        });
        this.socketLog = server(this.httpServer, {
            path: '/log',
            serveClient: false
        });
        this.listen();
    }
    SocketServer.prototype.listen = function () {
        var _this = this;
        this.httpServer.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.onConnect(this.socketTelemetry, "telemetrie");
        this.onConnect(this.socketPhoto, "photo");
        this.onConnect(this.socketLog, "log");
    };
    SocketServer.prototype.onConnect = function (socket, name) {
        var _this = this;
        socket.on('connect', function (socket) {
            console.log('Connected %s client on port %s.', name, _this.port);
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    return SocketServer;
}());
exports.SocketServer = SocketServer;
