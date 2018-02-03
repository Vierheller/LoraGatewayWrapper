import {Config} from "./Config";

export class ConfigHolder {
    public static config: Config = ConfigHolder.getConfigFromFile();

    public static getConfigFromFile(): Config {
        return require("./config.json");
    }
}
