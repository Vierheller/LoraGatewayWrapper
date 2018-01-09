import * as http from "http" ;
import server = require("socket.io");

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

        this.onConnect(this.socket, "telemetrie");
    }

    private onConnect(socket: SocketIO.Server, name: string){
        socket.on('connect', (socket: any) => {
            console.log('Connected %s client on port %s.', name, this.port);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    sendOverSocket(json){
        this.socket.send(json)
    }

    /**
     *
     * @param {number} id
     * @param {string} fileName
     * @param {string} base64Photo
     * @param {Date} timestamp
     */
    sendImage(id:number, fileName:string, base64Photo:string, timestamp:Date) {
        //TODO implement stub
        this.sendOverSocket({
            id: id,
            filename:fileName,
            photo_base64:base64Photo,
            timestamp:timestamp,
            type:"photo"
        })
    }

    /**
     *
     * @param {string} line
     * @param {Date} date
     */
    sendLog(line: string, date: Date) {
        this.sendOverSocket({
            line:line,
            timestamp:date
        })
    }

    /**
     *
     * @param {string} data
     */
    sendTelemetry(data:string) {
        this.sendOverSocket({
            data:data
        })
    }
}