import {GatewayClient} from "./GatewayClient";
import {SocketServer} from "./SocketServer";
import {PhotoDirectoryWatcher} from "./PhotoDirectoryWatcher";
import {Base64Encoder} from "./Base64Encoder";
import {ContinuousLogFileWatcher} from "./ContinuousLogFileWatcher";

export class GatewayWrapper{
    gatewaySocket : GatewayClient;
    socketServer: SocketServer;
    photoWatcher:PhotoDirectoryWatcher;
    logWatcher:ContinuousLogFileWatcher

    public static main(){
        const myWrapper = new GatewayWrapper();
        myWrapper.init();
        myWrapper.run()
    }

    //TODO update paths, hosts, urls
    private init(){
        this.gatewaySocket = new GatewayClient("localhost", 6004);
        this.socketServer = new SocketServer(3000);
        this.photoWatcher = new PhotoDirectoryWatcher("C:\\Users\\Vierheller\\Pictures\\lora");
        this.logWatcher = new ContinuousLogFileWatcher("PathToLog")
    }

    private run(){
        this.photoWatcher.setDownloadFinishedListener((path, fileName, photoTimestamp)=>{
            const base64Image = Base64Encoder.encode(path);
            //TODO update args
            this.socketServer.sendImage(0, fileName, base64Image, photoTimestamp)
        });

        this.logWatcher.setOnNewLineListener((line)=>{
            this.socketServer.sendLog(line, new Date())
        });
        this.logWatcher.watch();
    }
}