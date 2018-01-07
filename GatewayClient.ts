import {createConnection, Socket} from "net";

export class GatewayClient{
    clientSocket: Socket;
    port:number;
    host:string;

    constructor(host:string, port:number){
        this.host = host;
        this.port = port;
    }

    public connect(connectListener:()=>void, dataListener:(data:Buffer)=>void, errorListener:(err:Error)=>void){
        this.clientSocket = createConnection(this.port, this.host, connectListener);

        this.clientSocket.addListener("connect", connectListener);

        this.clientSocket.addListener("data", dataListener);

        this.clientSocket.addListener("error", errorListener);

        this.clientSocket.addListener("close", (had_error:boolean)=>{
            //Analyse
        });

        this.clientSocket.addListener("end", ()=>{
            //cleanup
        })
    }

}