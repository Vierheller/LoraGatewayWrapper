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
        this.onConnect(this.socket, "telemetrie");
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
    SocketServer.prototype.sendOverSocket = function (json) {
        this.socket.send(json);
    };
    /**
     *
     * @param {number} id
     * @param {string} fileName
     * @param {string} base64Photo
     * @param {Date} timestamp
     */
    SocketServer.prototype.sendImage = function (id, fileName, base64Photo, timestamp) {
        //TODO implement stub
        this.sendOverSocket({
            id: id,
            filename: fileName,
            photo_base64: base64Photo,
            timestamp: timestamp,
            type: "photo"
        });
    };
    /**
     *
     * @param {string} line
     * @param {Date} date
     */
    SocketServer.prototype.sendLog = function (line, date) {
        this.sendOverSocket({
            line: line,
            timestamp: date
        });
    };
    /**
     *
     * @param {string} data
     */
    SocketServer.prototype.sendTelemetry = function (data) {
        this.sendOverSocket({
            data: data
        });
    };
    return SocketServer;
}());
exports.SocketServer = SocketServer;
