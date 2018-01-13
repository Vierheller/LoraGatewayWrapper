import * as http from "http" ;
import server = require("socket.io");
import {Telemetry} from "./Telemetry";
import {Image} from "./Image";
import {Log} from "./Log";

export class SocketServer{
    httpServer:http.Server;
    socket:SocketIO.Server;

    port:number;

    constructor(port:number){
        this.port = port;

        this.httpServer = http.createServer();

        this.socket = server(this.httpServer, {
            path: '/',
            serveClient: false
        });

        this.listen()
    }

    private listen(){
        this.httpServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.onConnect(this.socket);
    }

    private onConnect(socket: SocketIO.Server){
        socket.on('connect', (socket: any) => {
            console.log('Connected on port %s.', this.port);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    sendOverSocket(json){
        console.log("Sending data to clients: "+ json);
        this.socket.send(JSON.stringify(json))
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