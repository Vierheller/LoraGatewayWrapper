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

    public Telemetry(data:JSON){
        this.class = data["class"];
        this.index = data["class"];
        this.channel = data["class"];
        this.payload = data["class"];
        this.time = data["class"];
        this.lat = data["class"];
        this.lon = data["class"];
        this.alt = data["class"];
        this.rate = data["class"];
        this.sentence = data["class"];
        this.json = data
    }
}