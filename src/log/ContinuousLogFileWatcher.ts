import * as Tail from "nodejs-tail";
import {ConfigHolder} from "../config/ConfigHolder";
import {GatewayWrapper} from "../GatewayWrapper";
import {Logging} from "../util/Logging";

export class ContinuousLogFileWatcher {
    private static Log: Logging = Logging.getInstance(ContinuousLogFileWatcher.toString());

    private path: string;

    private tailWatcher;

    private listener: (line: string) => void;

    constructor(file: string) {
        this.path = file;
    }

    public watch() {
        this.tailWatcher = new Tail(this.path);
        this.tailWatcher.on("line", (line) => {
            if (this.listener) {
                this.listener(line);
            }
        });

        this.tailWatcher.on("close", () => {
            ContinuousLogFileWatcher.Log.log("watching stopped");
        });

        this.tailWatcher.watch();
    }

    public stopWatching() {
        this.tailWatcher.close();
    }

    public setOnNewLineListener(listener: (line: string) => void) {
        this.listener = listener;
    }
}
