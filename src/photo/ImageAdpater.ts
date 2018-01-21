import {Image} from "../model/Image";

export class ImageAdapter{
    id:number;
    fileName:string;
    base64Image:string;
    timestamp:Date;

    //TODO from image
    static id_counter = 0;
    public constructor(fileName:string, base64Image:string){
        this.id = ImageAdapter.id_counter++;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = new Date();
    }

    private toJSON():Image{
        const json = <Image> {};

        json.image_counter = this.id;
        json.filename = this.fileName;
        json.image_base64 = this.base64Image;
        json.type = "image";

        return json;
    }

    public getJSON():Image {
        return this.toJSON();
    }
}