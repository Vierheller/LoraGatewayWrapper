import {Config} from "./config/Config";
import {ConfigHolder} from "./config/ConfigHolder";
import {ContinuousLogFileWatcher} from "./log/ContinuousLogFileWatcher";
import {LogAdapter} from "./log/LogAdapter";
import {Base64Encoder} from "./photo/Base64Encoder";
import {ImageAdapter} from "./photo/ImageAdpater";
import {PhotoDirectoryWatcher} from "./photo/PhotoDirectoryWatcher";
import {GatewayClient} from "./socket/GatewayClient";
import {SocketServer} from "./socket/SocketServer";
import {Telemetry} from "./socket/TelemetryAdapter";

export class GatewayWrapper {
    public static main() {
        const myWrapper = new GatewayWrapper();
        myWrapper.init();
        myWrapper.run();
    }

    private static config: Config = ConfigHolder.config;

    public gatewaySocket: GatewayClient;
    public socketServer: SocketServer;
    public photoWatcher: PhotoDirectoryWatcher;

    public logWatcher: ContinuousLogFileWatcher;

    // TODO update paths, hosts, urls
    private init() {
        this.gatewaySocket = new GatewayClient(GatewayWrapper.config.gateway_client_host,
            GatewayWrapper.config.gateway_client_port);
        this.socketServer = new SocketServer(GatewayWrapper.config.gateway_server_port);
        this.photoWatcher = new PhotoDirectoryWatcher(GatewayWrapper.config.photo_directory_path);
        this.logWatcher = new ContinuousLogFileWatcher(GatewayWrapper.config.log_file_path);
    }

    private run() {
        this.gatewaySocket.connect((err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Connected to raw Socket");
        });

        this.gatewaySocket.setDataListener((data: Telemetry) => {
            this.socketServer.sendOverSocket(data);
        });

        this.photoWatcher.setDownloadFinishedListener((path: string, fileName: string, photoTimestamp: Date) => {
            const base64Image = Base64Encoder.encode(path);
            const image = new ImageAdapter(fileName, base64Image);
            // TODO update args
            this.socketServer.sendOverSocket(image.getJSON());
        });

        this.logWatcher.setOnNewLineListener((line) => {
            const log = new LogAdapter(line);
            this.socketServer.sendOverSocket(log.getJSON());
        });
        this.logWatcher.watch();
    }
}
