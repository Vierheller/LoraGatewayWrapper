import * as http from "http" ;
import server = require("socket.io");
import {Telemetry} from "./Telemetry";
import {Image} from "./Image";
import {Log} from "./Log";

export class SocketServer{
    httpServer:http.Server;
    socketServer:SocketIO.Server;

    socketClient:any;
    port:number;

    constructor(port:number){
        this.port = port;

        this.httpServer = http.createServer();

        this.socketServer = server(this.httpServer, {
            path: '/',
            serveClient: false
        });

        this.listen()
    }

    private listen(){
        this.httpServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.onConnect(this.socketServer);
    }

    private onConnect(socketServer: SocketIO.Server){
        socketServer.on('connect', (socket: any) => {
            console.log('Client connected on port %s.', this.port);
            this.socketClient = socket;
            this.socketClient.emit("event", "Irgend ne scheiße halt");

            this.socketClient.on('disconnect', () => {
                console.log('Client disconnected');
                this.socketClient = null;
            });
        });
    }

    sendOverSocket(json){
        console.log("Sending data to clients: "+ json);
        if(this.socketClient){
            this.socketClient.emit("event", JSON.stringify(json));
        }
    }


    sendImage(image:Image) {
        this.sendOverSocket(image.toJSON());
    }

    sendLog(log:Log) {
        this.sendOverSocket(log.toJSON())
    }

    sendTelemetry(data:Telemetry) {
        this.sendOverSocket(data.getJSON())
    }
}