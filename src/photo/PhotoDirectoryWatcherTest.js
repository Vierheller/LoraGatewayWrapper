"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhotoDirectoryWatcher_1 = require("./PhotoDirectoryWatcher");
var Base64Encoder_1 = require("./Base64Encoder");
function test1() {
    var watcher = new PhotoDirectoryWatcher_1.PhotoDirectoryWatcher(__dirname + "/../../test");
    watcher.setDownloadFinishedListener((function (path, fileName, photoTimestamp) {
        console.log("Download finished. path:" + path, " filename:" + fileName + " timestamp: " + photoTimestamp);
        var base64 = Base64Encoder_1.Base64Encoder.encode(path);
        console.log("Base 64: " + base64);
    }));
}
test1();
//# sourceMappingURL=PhotoDirectoryWatcherTest.js.map