"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = require("socket.io");
var Logging_1 = require("../util/Logging");
var SocketServer = /** @class */ (function () {
    function SocketServer(port) {
        this.port = port;
        this.httpServer = http.createServer();
        this.socketServer = server(this.httpServer, {
            path: "/",
            serveClient: false,
        });
        this.listen();
    }
    SocketServer.prototype.sendImage = function (image) {
        this.sendOverSocket(image);
    };
    SocketServer.prototype.sendTelementry = function (telemetry) {
        this.sendOverSocket(telemetry);
    };
    SocketServer.prototype.sendLog = function (log) {
        this.sendOverSocket(log);
    };
    SocketServer.prototype.sendOverSocket = function (json) {
        SocketServer.Log.log("Sending incomingData to clients: " + json);
        if (this.socketClient) {
            this.socketClient.emit("event", JSON.stringify(json));
        }
    };
    SocketServer.prototype.listen = function () {
        var _this = this;
        this.httpServer.listen(this.port, function () {
            SocketServer.Log.log("Running server on port %s", _this.port);
        });
        this.onConnect(this.socketServer);
    };
    SocketServer.prototype.onConnect = function (socketServer) {
        var _this = this;
        socketServer.on("connect", function (socket) {
            SocketServer.Log.log("Client connected on port %s.", _this.port);
            _this.socketClient = socket;
            // this.socketClient.emit("event", "Irgend ne scheiße halt");
            _this.socketClient.on("disconnect", function () {
                SocketServer.Log.log("Client disconnected");
                _this.socketClient = null;
            });
        });
    };
    SocketServer.Log = Logging_1.Logging.getInstance(SocketServer.toString());
    return SocketServer;
}());
exports.SocketServer = SocketServer;
//# sourceMappingURL=SocketServer.js.map