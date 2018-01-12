import {Config} from "./Config";



export class ConfigHolder{
    static config:Config = ConfigHolder.getConfigFromFile();

    static getConfigFromFile():Config {
        return require('./config.json')
    }
}