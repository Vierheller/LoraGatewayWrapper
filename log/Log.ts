export class Log{
    line:string;
    timestamp:Date;

    constructor(line:string){
        this.line = line;
        this.timestamp = new Date();
    }

    public toJSON():JSON{
        const json = JSON.parse("{}");

        json["line"] = this.line;
        json["timestamp"] = this.timestamp;

        return json;
    }
}