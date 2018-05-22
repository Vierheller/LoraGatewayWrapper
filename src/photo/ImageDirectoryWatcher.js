"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = require("chokidar");
var fs = require("fs");
var Path = require("path");
var Logging_1 = require("../util/Logging");
var Base64Encoder_1 = require("./Base64Encoder");
var ImageFile_1 = require("./ImageFile");
var ImageHelper_1 = require("./ImageHelper");
var ImageAdpater_1 = require("./ImageAdpater");
var ImageDirectoryWatcher = /** @class */ (function () {
    function ImageDirectoryWatcher(path) {
        this.directoryPath = path;
        this.init();
    }
    ImageDirectoryWatcher.getFile = function (path, callback) {
        fs.readFile(path, callback);
    };
    ImageDirectoryWatcher.prototype.finishedDownload = function (image) {
        var base64Image = Base64Encoder_1.Base64Encoder.encode(image.path);
        var image2 = new ImageAdpater_1.ImageAdapter(image.count, image.fileName, base64Image, image.appearDate);
        this.onFileDownloadFinishedListener(image2);
    };
    ImageDirectoryWatcher.prototype.setDownloadFinishedListener = function (listener) {
        this.onFileDownloadFinishedListener = listener;
    };
    ImageDirectoryWatcher.prototype.init = function () {
        var _this = this;
        this.watcher = chokidar_1.watch(this.directoryPath, {
            persistent: true,
        });
        this.downloadHelper = new ImageHelper_1.ImageHelper(this);
        this.watcher
            .on("add", function (path) {
            ImageDirectoryWatcher.Log.log("File", path, " added");
            _this.processFile(path);
        })
            .on("change", function (path) {
            // ImageDirectoryWatcher.Log.log("File", path, "has been changed");
        })
            .on("unlink", function (path) {
            // ImageDirectoryWatcher.Log.log("File", path, "has been removed");
        })
            .on("error", function (error) {
            ImageDirectoryWatcher.Log.error("Error happened", error);
        });
    };
    ImageDirectoryWatcher.prototype.processFile = function (path) {
        var _this = this;
        var filename = this.getFileNameFromPath(path);
        // Valid filename?
        var regex = new RegExp(/[a-zA-Z]+_\d+/);
        if (regex.test(filename)) {
            // Cut off .JPG
            var counterstr_1 = filename.split(".")[0];
            // Cut off DHBW_
            counterstr_1 = counterstr_1.split("_").pop();
            // Try to get iNode stats for the picture
            fs.stat(path, function (err, stats) {
                var photo;
                if (err !== null) {
                    // Can happen if the OS does not provide INode stats for Files
                    ImageDirectoryWatcher.Log.error(err);
                    photo = new ImageFile_1.ImageFile(path, filename, Number(counterstr_1), new Date());
                }
                else {
                    // No error, we can get the photo stats
                    photo = new ImageFile_1.ImageFile(path, filename, Number(counterstr_1), stats.birthtime);
                }
                ImageDirectoryWatcher.Log.log(photo.toString());
                _this.downloadHelper.putPhoto(photo);
            });
        }
        else {
            ImageDirectoryWatcher.Log.error(filename + " does not match pattern");
        }
    };
    /**
     * gets last part of path
     * @param {string} path
     * @returns {string | undefined}
     */
    ImageDirectoryWatcher.prototype.getFileNameFromPath = function (path) {
        return Path.basename(path);
    };
    ImageDirectoryWatcher.Log = Logging_1.Logging.getInstance("ImageDirectoryWatcher");
    return ImageDirectoryWatcher;
}());
exports.ImageDirectoryWatcher = ImageDirectoryWatcher;
//# sourceMappingURL=ImageDirectoryWatcher.js.map