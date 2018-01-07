import {GatewayClient} from "./GatewayClient";
import {SocketServer} from "./SocketServer";

export class GatewayWrapper{
    gatewaySocket : GatewayClient;
    socketServer: SocketServer;

    public static main(){
        const myWrapper = new GatewayWrapper();
        myWrapper.init()
    }

    private init(){
        this.gatewaySocket = new GatewayClient("localhost", 6004)
        this.socketServer = new SocketServer(3000)
    }
}