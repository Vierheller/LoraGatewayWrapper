import {Image} from "../model/Image";

export class ImageAdapter {
    // TODO from image
    private static ID_COUNTER = 0;

    private id: number;
    private fileName: string;
    private base64Image: string;
    private timestamp: Date;

    public constructor(fileName: string, base64Image: string) {
        this.id = ImageAdapter.ID_COUNTER++;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = new Date();
    }

    public getJSON(): Image {
        return this.toJSON();
    }

    private toJSON(): Image {
        const json = {} as Image;

        json.image_counter = this.id;
        json.filename = this.fileName;
        json.image_base64 = this.base64Image;
        json.type = "image";

        return json;
    }
}
