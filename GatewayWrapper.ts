import {GatewayClient} from "./GatewayClient";
import {SocketServer} from "./SocketServer";
import {PhotoDirectoryWatcher} from "./PhotoDirectoryWatcher";
import {Base64Encoder} from "./Base64Encoder";
import {ContinuousLogFileWatcher} from "./ContinuousLogFileWatcher";
import {Telemetry} from "./Telemetrie";
import {Image} from "./Image";
import {Log} from "./Log";

export class GatewayWrapper{
    gatewaySocket : GatewayClient;
    socketServer: SocketServer;
    photoWatcher:PhotoDirectoryWatcher;
    logWatcher:ContinuousLogFileWatcher;

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
        this.gatewaySocket.connect(err => {
            if(err){
                console.error(err);
                return;
            }
            console.log("Connected to raw Socket")
        });

        this.gatewaySocket.setDataListener((data:Telemetry) => {
            this.socketServer.sendTelemetry(data)
        });

        this.photoWatcher.setDownloadFinishedListener((path, fileName, photoTimestamp)=>{
            const base64Image = Base64Encoder.encode(path);
            const image = new Image(fileName, base64Image)
            //TODO update args
            this.socketServer.sendImage(image)
        });

        this.logWatcher.setOnNewLineListener((line)=>{
            const log = new Log(line);
            this.socketServer.sendLog(log)
        });
        this.logWatcher.watch();
    }
}