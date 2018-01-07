import * as http from "http" ;
import server = require("socket.io");

export class SocketServer{
    httpServer:http.Server;
    socketTelemetry:SocketIO.Server;
    socketPhoto:SocketIO.Server;
    socketLog:SocketIO.Server;

    port:number;

    constructor(port:number){
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

        this.listen()
    }

    private listen(){
        this.httpServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.onConnect(this.socketTelemetry, "telemetrie");
        this.onConnect(this.socketPhoto, "photo");
        this.onConnect(this.socketLog, "log");
    }

    private onConnect(socket: SocketIO.Server, name: string){
        socket.on('connect', (socket: any) => {
            console.log('Connected %s client on port %s.', name, this.port);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    sendImage(id:number, fileName:string, base64Photo:string, timestamp:Date) {
        //TODO implement stub
    }

    sendLog(line: string, date: Date) {
        //TODO implement stub
    }

    sendTelemetry(data:string) {
        //TODO implement stub
    }
}