import * as fs from "fs";
import {ContinuousLogFileWatcher} from "../log/ContinuousLogFileWatcher";
import {Logging} from "../util/Logging";

export class Base64Encoder {
    public static encode(path: string): string{
        // read binary data
        const bitmap = fs.readFileSync(path);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString("base64");
    }

    private static Log: Logging = Logging.getInstance("Base64Encoder");
}
