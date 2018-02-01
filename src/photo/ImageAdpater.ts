import {Image} from "../model/Image";

export class ImageAdapter {

    private id: number;
    private fileName: string;
    private base64Image: string;
    private timestamp: Date;

    public constructor(id: number, fileName: string, base64Image: string, timestamp: Date) {
        this.id = id;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = timestamp;
    }

    public getJSON(): Image {
        return this.toJSON();
    }

    private toJSON(): Image {
        const json = {} as Image;

        json.image_counter = this.id;
        json.filename = this.fileName;
        json.image_base64 = this.base64Image;
        json.timestamp = this.timestamp.getTime();
        json.type = "image";

        return json;
    }
}
