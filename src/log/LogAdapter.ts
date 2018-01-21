import {Log} from "../model/Log";

export class LogAdapter{
    private line:string;
    private timestamp:Date;

    constructor(line:string){
        this.line = line;
        this.timestamp = new Date();
    }

    public getJSON():Log{
        return this.toJSON();
    }

    private toJSON():Log{
        const newJson = <Log>{};
        newJson.data = this.line;
        newJson.timestamp = this.timestamp.getTime();
        newJson.type = "log";
        return newJson;
    }
}