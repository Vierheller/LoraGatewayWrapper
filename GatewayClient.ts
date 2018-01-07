import {createConnection, Socket} from "net";

export class GatewayClient{
    clientSocket: Socket;
    port:number;
    host:string;

    connected:boolean = false;

    dataListener:(data:Buffer)=>void;

    constructor(host:string, port:number){
        this.host = host;
        this.port = port;
    }

    public connect(connectCallback:(err: Error)=>void){
        this.clientSocket = createConnection(this.port, this.host, ()=>{
            this.connected = true;

            this.setDataListener(this.dataListener);

            this.clientSocket.addListener("close", (had_error:boolean)=>{
                //Analyse
            });

            this.clientSocket.addListener("end", ()=>{
                //cleanup
            });

            connectCallback(null);
        });

        this.clientSocket.addListener("error", (err:Error) => {
            connectCallback(err);
        });
    }

    setDataListener(listener:(data:Buffer)=>void){
        this.dataListener = listener;

        if(this.connected)
            this.clientSocket.addListener("data", listener);
    }

    //TODO
    static bufferToJSON(buffer:Buffer){
        return {

        }
    }

}