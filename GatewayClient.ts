import {createConnection, Socket} from "net";
import {LogHandler} from "./LogHandler";

export class GatewayClient{
    private log : LogHandler = LogHandler.getInstance()

    clientSocket: Socket;
    port:number;
    host:string;

    connected:boolean = false;

    dataListener:(data:Buffer)=>void;

    constructor(host:string, port:number){
        this.host = host;
        this.port = port;
    }

    /**
     * Method to connect to a linux socket and bind listeners to it
     * @param {(err: Error) => void} connectCallback
     */
    public connect(connectCallback:(err: Error)=>void){
        this.clientSocket = createConnection(this.port, this.host, ()=>{
            this.connected = true;

            this.setDataListener((data:Buffer) => {
                this.log.log("new Data: " + data);
                const jsonData = GatewayClient.bufferToJSON(data);
                if(this.dataListener)
                    this.dataListener(data)
            });

            this.clientSocket.addListener("close", (had_error:boolean)=>{
                //Analyse
                this.log.log("Connection was closed with " + had_error? "an" : "no" + "errors")
            });

            this.clientSocket.addListener("end", ()=>{
                //cleanup
                this.log.log("Connection ended!")
            });

            connectCallback(null);
        });

        //Outside connect, since connect could throw an error
        this.clientSocket.addListener("error", (err:Error) => {
            connectCallback(err);
        });
    }

    //Set internal data listener for event chain
    setDataListener(listener:(data:Buffer)=>void){
        this.dataListener = listener;
    }

    //TODO SAFE??? -> No typing
    static bufferToJSON(buffer:Buffer){
        const data = buffer.toString('utf8');
        return JSON.parse(data)
    }

}