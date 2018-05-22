"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base64Encoder_1 = require("./Base64Encoder");
var ImageDirectoryWatcher_1 = require("./ImageDirectoryWatcher");
function test1() {
    var watcher = new ImageDirectoryWatcher_1.ImageDirectoryWatcher(__dirname + "/../../test");
    watcher.setDownloadFinishedListener((function (count, path, fileName, photoTimestamp) {
        console.log("Download finished. path:" + path, " filename:" + fileName + " timestamp: " + photoTimestamp);
        var base64 = Base64Encoder_1.Base64Encoder.encode(path);
        // console.log("Base 64: " + base64);
    }));
}
test1();
//# sourceMappingURL=PhotoDirectoryWatcherTest.spec.js.map