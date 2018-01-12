/*
    {
        "class":"POSN",
        "index":0,
        "channel":1,
        "payload":"DHBW",
        "time":"00:00:00",
        "lat":0.00000,
        "lon":0.00000,
        "alt":0,
        "rate":0.0,
        "sentence":"$$DHBW,144,00:00:00,0.00000,0.00000,00000,0,0,0,21.5,0.0,11.199,21.6,1013,0.0,20.4*035F"}
*/
export class Telemetry{
    class:string;
    index:number;
    channel:number;
    payload:string;
    time:string;
    lat:number;
    lon:number;
    alt:number;
    rate:number;
    sentence:string;
    json:JSON;

    public constructor(data:JSON){
        this.class = data["class"];
        this.index = data["index"];
        this.channel = data["channel"];
        this.payload = data["payload"];
        this.time = data["time"];
        this.lat = data["lat"];
        this.lon = data["lon"];
        this.alt = data["alt"];
        this.rate = data["rate"];
        this.sentence = data["sentence"];
        this.json = data
    }
}