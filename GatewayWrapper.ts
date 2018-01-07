import {GatewayClient} from "./GatewayClient";
import {SocketServer} from "./SocketServer";
import {PhotoDirectoryWatcher} from "./PhotoDirectoryWatcher";

export class GatewayWrapper{
    gatewaySocket : GatewayClient;
    socketServer: SocketServer;
    photoWatcher:PhotoDirectoryWatcher

    public static main(){
        const myWrapper = new GatewayWrapper();
        myWrapper.init()
    }

    private init(){
        this.gatewaySocket = new GatewayClient("localhost", 6004);
        this.socketServer = new SocketServer(3000);
        this.photoWatcher = new PhotoDirectoryWatcher("C:\\Users\\Vierheller\\Pictures\\lora");
    }
}