import * as fs from "fs";

export class Base64Encoder{
    public static encode(path:string){
        // read binary data
        const bitmap = fs.readFileSync(path);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    }
}