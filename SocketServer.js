"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = require("socket.io");
var SocketServer = /** @class */ (function () {
    function SocketServer(port) {
        this.port = port;
        this.httpServer = http.createServer();
        this.socket = server(this.httpServer, {
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
        this.onConnect(this.socket);
    };
    SocketServer.prototype.onConnect = function (socket) {
        var _this = this;
        socket.on('connect', function (socket) {
            console.log('Connected on port %s.', _this.port);
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    SocketServer.prototype.sendOverSocket = function (json) {
        console.log("Sending data to clients: " + json);
        this.socket.send(JSON.stringify(json));
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
