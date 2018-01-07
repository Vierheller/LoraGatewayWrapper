import {GatewayClient} from "./GatewayClient";
import {SocketServer} from "./SocketServer";
import {PhotoDirectoryWatcher} from "./PhotoDirectoryWatcher";
import {Base64Encoder} from "./Base64Encoder";

export class GatewayWrapper{
    gatewaySocket : GatewayClient;
    socketServer: SocketServer;
    photoWatcher:PhotoDirectoryWatcher

    public static main(){
        const myWrapper = new GatewayWrapper();
        myWrapper.init();
        myWrapper.run()
    }

    private init(){
        this.gatewaySocket = new GatewayClient("localhost", 6004);
        this.socketServer = new SocketServer(3000);
        this.photoWatcher = new PhotoDirectoryWatcher("C:\\Users\\Vierheller\\Pictures\\lora");
    }

    private run(){
        this.photoWatcher.setDownloadFinishedListener((path, fileName, photoTimestamp)=>{
            const base64Image = Base64Encoder.encode(path);
            //TODO update args
            this.socketServer.sendImage(0, fileName, base64Image, photoTimestamp)
        })
    }
}