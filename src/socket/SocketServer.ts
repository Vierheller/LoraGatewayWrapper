import * as http from "http" ;
import server = require("socket.io");
import {Image} from "../model/Image";
import {Log} from "../model/Log";
import {Telemetry} from "./TelemetryAdapter";

export class SocketServer {
    private httpServer: http.Server;
    private socketServer: SocketIO.Server;

    private socketClient: any;
    private port: number;

    constructor(port: number) {
        this.port = port;

        this.httpServer = http.createServer();

        this.socketServer = server(this.httpServer, {
            path: "/",
            serveClient: false,
        });

        this.listen();
    }

    public sendImage(image: Image) {
        this.sendOverSocket(image);
    }

    public sendTelementry(telemetry: Telemetry) {
        this.sendOverSocket(telemetry);
    }

    public sendLog(log: Log) {
        this.sendOverSocket(log);
    }

    private sendOverSocket(json) {
        console.log("Sending incomingData to clients: " + json);
        if (this.socketClient) {
            this.socketClient.emit("event", JSON.stringify(json));
        }
    }

    private listen() {
        this.httpServer.listen(this.port, () => {
            console.log("Running server on port %s", this.port);
        });

        this.onConnect(this.socketServer);
    }

    private onConnect(socketServer: SocketIO.Server) {
        socketServer.on("connect", (socket: any) => {
            console.log("Client connected on port %s.", this.port);
            this.socketClient = socket;
            // this.socketClient.emit("event", "Irgend ne scheiße halt");

            this.socketClient.on("disconnect", () => {
                console.log("Client disconnected");
                this.socketClient = null;
            });
        });
    }
}
