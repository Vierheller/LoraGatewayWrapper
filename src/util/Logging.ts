import { Logger, LoggerInstance, transports} from "winston";
import {ConfigHolder} from "../config/ConfigHolder";

export class Logging {

    public static getInstance(className: string) {
        if (!Logging.instance) {
            Logging.instance = new Logging(className);
        }
        return Logging.instance;
    }

    private static instance: Logging;
    private static writer: LoggerInstance;

    private className: string;

    private constructor(className: string) {
        this.className = className;

        Logging.writer = new Logger({
            transports: [
                new transports.Console({
                    colorize: true,
                    timestamp: true,
                }),
                new transports.File ({timestamp: true, filename: ConfigHolder.config.logfile_name }),
            ],
        });
    }

    public log(message: string, ...args: any[]) {
        Logging.writer.info("[" + this.className + "]" + message, args);
    }

    public error(message?: any, ...args: any[]) {
        Logging.writer.error("[" + this.className + "]" + message, args);
    }
}
