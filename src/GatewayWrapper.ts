import {Config} from "./config/Config";
import {ConfigHolder} from "./config/ConfigHolder";
import {ContinuousLogFileWatcher} from "./log/ContinuousLogFileWatcher";
import {LogAdapter} from "./log/LogAdapter";
import {Base64Encoder} from "./photo/Base64Encoder";
import {ImageAdapter} from "./photo/ImageAdpater";
import {ImageDirectoryWatcher} from "./photo/ImageDirectoryWatcher";
import {GatewayClient} from "./socket/GatewayClient";
import {SocketServer} from "./socket/SocketServer";
import {Telemetry} from "./socket/TelemetryAdapter";
import {Logging} from "./util/Logging";

export class GatewayWrapper {
    public static main() {
        const myWrapper = new GatewayWrapper();
        myWrapper.init();
        myWrapper.run();
    }

    private static Log: Logging = Logging.getInstance(GatewayWrapper.toString());
    private static config: Config = ConfigHolder.config;

    public gatewaySocket: GatewayClient;
    public socketServer: SocketServer;
    public photoWatcher: ImageDirectoryWatcher;

    public logWatcher: ContinuousLogFileWatcher;

    // TODO update paths, hosts, urls
    private init() {
        this.gatewaySocket = new GatewayClient(GatewayWrapper.config.gateway_client_host,
            GatewayWrapper.config.gateway_client_port);
        this.socketServer = new SocketServer(GatewayWrapper.config.gateway_server_port);
        this.photoWatcher = new ImageDirectoryWatcher(GatewayWrapper.config.photo_directory_path);
        this.logWatcher = new ContinuousLogFileWatcher(GatewayWrapper.config.log_file_path);
    }

    private run() {
        this.gatewaySocket.connect((err) => {
            if (err) {
                GatewayWrapper.Log.error(err);
                return;
            }
            GatewayWrapper.Log.log("Connected to raw Socket");
        });

        this.gatewaySocket.setDataListener((data: Telemetry) => {
            this.socketServer.sendTelementry(data.getOutgoingJSON());
        });

        this.photoWatcher.setDownloadFinishedListener(
                (image: ImageAdapter) => {
            this.socketServer.sendImage(image.getJSON());
        });

        this.logWatcher.setOnNewLineListener((line) => {
            const log = new LogAdapter(line);
            this.socketServer.sendLog(log.getJSON());
        });
        this.logWatcher.watch();
    }
}
