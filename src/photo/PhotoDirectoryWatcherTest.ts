import {PhotoDirectoryWatcher} from "./PhotoDirectoryWatcher";
import {Base64Encoder} from "./Base64Encoder";

function test1(): void {
    let watcher = new PhotoDirectoryWatcher(__dirname + "/../../test");
    watcher.setDownloadFinishedListener(((path, fileName, photoTimestamp) => {
        console.log("Download finished. path:"+ path, " filename:"+ fileName + " timestamp: "+photoTimestamp);
        const base64 = Base64Encoder.encode(path);
        console.log("Base 64: "+ base64);
    }))
}


test1();