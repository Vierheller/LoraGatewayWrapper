export class Image{
    id:number;
    fileName:string;
    base64Image:string;
    timestamp:Date;

    static id_counter = 0;
    public constructor(fileName:string, base64Image:string){
        this.id = Image.id_counter++;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = new Date();
    }

    public toJSON():JSON{
        const json = JSON.parse("{}");

        json["id"] = this.id;
        json["fileName"] = this.fileName;
        json["base64Image"] = this.base64Image;
        json["timestamp"] = this.timestamp;

        return json;
    }
}