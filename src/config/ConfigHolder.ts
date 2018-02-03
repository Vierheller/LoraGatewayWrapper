import {Logging} from "../util/Logging";
import {Config} from "./Config";

export class ConfigHolder {
    public static config: Config = ConfigHolder.getConfigFromFile();

    public static getConfigFromFile(): Config {
        return require("./config.json");
    }

    private static Log: Logging = Logging.getInstance(ConfigHolder.toString());
}
